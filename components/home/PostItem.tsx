import 'lazysizes'
import Link from 'next/link'
import { FaRegCommentDots } from 'react-icons/fa'
import { PostTypes } from 'types/post'
import { UserState } from 'types/user'
import useSWR from 'swr'
import PostItemListed from './PostItemListed'
import { getPostDataById } from 'lib/queries/posts'

const PostItem = ({ post, user }: { post: PostTypes; user: UserState }) => {
  const { data, mutate } = useSWR(
    post ? ['get-post', post.id] : null,
    getPostDataById
  )

  // console.log(user.searching_city.city_name, 'la ruta')

  const url =
    user?.searching_city?.city_name == 'Todo Colombia'
      ? '?loc=Colombia'
      : `?loc=${user?.searching_city?.city_id}`
  return (
    <div className="group">
      <Link
        href={
          user?.searching_city
            ? `/tatuajes/${post.id}/${url}`
            : `/tatuajes/${post.id}?loc=Colombia`
        }
        scroll={false}
        // as={`/tatuajes/${post.id}/${user?.searching_city?.city_name}`}
      >
        <a>
          <div
            className={
              post.picture_size == 'portrait'
                ? 'aspect-w-3 aspect-h-4 relative'
                : post.picture_size == 'landscape'
                ? 'aspect-w-4 aspect-h-3 relative'
                : 'aspect-w-1 aspect-h-1 relative'
            }
          >
            <div
              style={{ boxShadow: 'rgb(0 0 0 / 87%) 0px 2px 32px 0px inset' }}
              className="absolute w-full h-full group-hover:z-10"
            ></div>

            <img
              alt={`Este es un tatuaje de: ${post.displayName}`}
              className="lazyload rounded-md  object-cover"
              src={`${post?.image?.url}/tr:w-340,q-20`}
              data-srcset={`${post?.image?.url}/tr:w-340,q-80 1x, 
                ${post?.image?.url}/tr:w-246,q-85 4x, 
                ${post?.image?.url}/tr:w-320,q-80 3x, 
                ${post?.image?.url}/tr:w-245,q-90 4x
              `}
            />
          </div>
        </a>
      </Link>
      <div className="flex justify-between mt-2">
        <div className="flex items-center space-x-2">
          <p className="text-gray-400 text-sm">
            {post.displayName || 'Sin nombre'}
          </p>
        </div>
        <div className="flex space-x-5">
          {post.counter_comments ? (
            <div className="flex items-center space-x-2 text-white">
              <p className="">{post.counter_comments || 12}</p>
              <span>
                <FaRegCommentDots />
              </span>
            </div>
          ) : null}
          <div className="flex items-center space-x-2 text-white">
            {data?.post && <p>{data.post.counter_listed}</p>}
            <PostItemListed user={user} post={post} mutatePost={mutate} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem
