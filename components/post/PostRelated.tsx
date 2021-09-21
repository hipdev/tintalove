import Link from 'next/link'
import { PostTypes } from 'types/post'
import { UserState } from 'types/user'
import Image from 'next/image'

const loaderPost = ({ src, quality }: any) => {
  return `${src}/tr:pr-true,c-at_max,f-auto,h-290,q-${quality || 75}`
}

const PostRelated = ({ post, user }: { post: PostTypes; user: UserState }) => {
  console.log(post, 'el post relacionado')
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
      <a className="group">
        <div className="mb-0 md:mb-5 relative h-60 2xl:h-72 sm:h-60 w-full">
          <div
            style={{ boxShadow: 'rgb(0 0 0 / 87%) 0px 2px 92px 0px inset' }}
            className="absolute w-full h-full group-hover:z-10"
          />
          <Image
            loader={loaderPost}
            src={post?.photo_info?.url}
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

export default PostRelated
