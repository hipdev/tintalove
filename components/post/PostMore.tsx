import Link from 'next/link'
import { PostTypes } from 'types/post'
import { UserState } from 'types/user'

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
      <a className="group">
        <div
          className={
            'mb-5 relative ' +
            (post.photo_size == 'portrait'
              ? 'aspect-w-3 aspect-h-4'
              : post.photo_size == 'landscape'
              ? 'aspect-w-4 aspect-h-3'
              : 'aspect-w-1 aspect-h-1')
          }
        >
          <div
            style={{ boxShadow: 'rgb(0 0 0 / 87%) 0px 2px 92px 0px inset' }}
            className="absolute w-full h-full group-hover:z-10"
          />

          <img
            className="w-full rounded-md  object-cover"
            src={
              post?.photo_info?.url + '/tr:pr-true,c-at_max,w-200,f-auto,q-90'
            }
          />
        </div>
      </a>
    </Link>
  )
}

export default PostMore
