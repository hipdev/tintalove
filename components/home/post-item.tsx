import Link from 'next/link'
import { FaRegCommentDots } from 'react-icons/fa'
import { PostTypes } from 'types/post'
import { UserState } from 'types/user'
import useSWR from 'swr'
import PostItemListed from './post-item-listed'
import { getPostDataById } from 'lib/queries/posts'

const PostItem = ({ post, user }: { post: PostTypes; user: UserState }) => {
  const { data, mutate } = useSWR(
    post ? ['get-post', post.id] : null,
    getPostDataById
  )

  return (
    <div>
      <Link
        href={`/tatuajes/${post.id}`}
        as={`/tatuajes/${post.id}`}
        scroll={false}
      >
        <a>
          <img
            // src="https://via.placeholder.com/309x234"
            src={
              post?.image?.url
                ? `${post.image.url}/tr:pr-true,c-at_max,f-auto,h-235,q-100`
                : 'https://via.placeholder.com/309x234'
            }
            alt=""
            className="w-full rounded-sm  object-cover"
          />
        </a>
      </Link>
      <div className="flex justify-between mt-2">
        <div className="flex items-center space-x-2">
          <img
            src={
              user
                ? `${user?.photoUrl}/tr:pr-true,c-at_max,f-auto,h-32,q-100`
                : null
            }
            className="w-7 h-7 bg-primary rounded-full"
          />
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
