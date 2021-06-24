import Link from 'next/link'
import { FaRegCommentDots } from 'react-icons/fa'
import { PostTypes } from 'types/post'
import { UserState } from 'types/user'
import useSWR from 'swr'
import PostItemListed from './post-item-listed'
import { getPostDataById } from 'lib/queries/posts'
import Image from 'next/image'

const myLoader = ({ src, width, quality }) => {
  return `${src}/tr:pr-true,w-${width},q-${quality || 75}`
}
const loaderPost = ({ src, quality }: any) => {
  return `${src}/tr:pr-true,c-at_max,f-auto,h-235,q-${quality || 75}`
}

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
          {/* <img
            // src="https://via.placeholder.com/309x234"
            src={
              post?.image?.url
                ? `${post.image.url}/tr:pr-true,c-at_max,f-auto,h-235,q-100`
                : 'https://via.placeholder.com/309x234'
            }
            alt=""
            className="w-full rounded-md  object-cover"
          /> */}

          <div
            className={
              post.picture_size == 'portrait'
                ? 'aspect-w-3 aspect-h-4 relative'
                : post.picture_size == 'landscape'
                ? 'aspect-w-4 aspect-h-3 relative'
                : 'aspect-w-1 aspect-h-1 relative'
            }
          >
            <Image
              loader={loaderPost}
              src={post?.image?.url}
              alt="Artist photo"
              layout="fill"
              // width={600}
              // height={500}
              sizes="100%"
              loading="lazy"
              quality={100}
              className="w-full rounded-md  object-cover"
            />
          </div>
        </a>
      </Link>
      <div className="flex justify-between mt-2">
        <div className="flex items-center space-x-2">
          <Image
            loader={myLoader}
            src={post?.artist_picture}
            alt="Artist photo"
            width={35}
            height={35}
            quality={70}
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
