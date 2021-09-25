import Link from 'next/link'
import { PostTypes } from 'types/post'
import { UserState } from 'types/user'

const PostRelated = ({ post, user }: { post: PostTypes; user: UserState }) => {
  const url =
    user?.searching_city?.city_name == 'Todo Colombia'
      ? '?loc=Colombia'
      : `?loc=${user?.searching_city}`
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

          <img
            className="w-full h-full rounded-md  object-cover"
            src={
              post?.photo_info?.url + '/tr:pr-true,c-at_max,w-450,f-auto,q-90'
            }
            alt={post.description}
          />
        </div>
      </a>
    </Link>
  )
}

export default PostRelated
