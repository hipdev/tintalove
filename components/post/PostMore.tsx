import Link from 'next/link'
import { PostTypes } from 'types/post'
import { UserState } from 'types/user'
import Image from 'next/image'

const loaderPost = ({ src, quality }: any) => {
  return `${src}/tr:pr-true,c-at_max,f-auto,h-235,q-${quality || 75}`
}

const PostMore = ({ post, user }: { post: PostTypes; user: UserState }) => {
  const url =
    user?.searching_city?.city_name == 'Todo Colombia'
      ? '?loc=Colombia'
      : `?loc=${user?.searching_city?.city_id}`
  return (
    <Link
      href={
        user?.searching_city
          ? `/tatuajes/${post.id}/${url}`
          : `/tatuajes/${post.id}?loc=Colombia`
      }
      scroll={true}
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
          <Image
            loader={loaderPost}
            src={post?.image?.url}
            alt="Artist photo"
            layout="fill"
            // width={600}
            // height={500}
            sizes="100%"
            quality={100}
            className="w-full rounded-md  object-cover"
          />
        </div>
      </a>
    </Link>
  )
}

export default PostMore