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
    <div>
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
            <img
<<<<<<< HEAD
              src={`${post?.image?.url}/tr:q-20`}
              sizes="(min-width: 1000px) 930px, 90vw"
              data-srcset={`${post?.image?.url}/tr:w-500,q-50 3x,
              ${post?.image?.url}/tr:w-640,q-50 2x,
              ${post?.image?.url}/tr:w-1024,q-40 1x`}
              data-src={`${post?.image?.url}/tr:w-1024,q-40 1x`}
              className="lazyload"
              alt="image"
            />

            {/*<Image
              loader={loaderPost}
              src={post?.image?.url}
              alt="Artist photo"
              layout="fill"
              // width={600}
              // height={500}
              sizes="100%"
              quality={100}
              className="w-full rounded-md  object-cover"
            />*/}
=======
              alt={`Este es un tatuaje de: ${post.displayName}`}
              className="lazyload rounded-md  object-cover"
              src={`${post?.image?.url}/tr:w-340,q-20`}
              data-srcset={`${post?.image?.url}/tr:w-340,q-80 1x, 
                ${post?.image?.url}/tr:w-246,q-80 2x, 
                ${post?.image?.url}/tr:w-320,q-80 3x, 
                ${post?.image?.url}/tr:w-245,q-80 4x
              `}
            />
>>>>>>> 52f1a280c5ad284658ce3565077e3da7f1c167e0
          </div>
        </a>
      </Link>
      <div className="flex justify-between mt-2">
        <div className="flex items-center space-x-2">
          <p className="text-white text-sm">
            {post.displayName || 'Sin nombre'}
          </p>
        </div>
        <div className="flex space-x-5">
          {post.counter_comments ? (
            <div className="flex items-center hola space-x-2 text-white">
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
