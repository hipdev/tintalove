import Link from 'next/link'

import { RiHeart3Fill } from 'react-icons/ri'
import toast from 'react-hot-toast'

import { removePostFromList } from 'lib/queries/lists'
import { PostList } from 'types/post-list'
import { UserState } from 'types/user'

const ListPost = ({
  post,
  setUserListItems,
  user,
}: {
  post: PostList
  setUserListItems: any
  user: UserState
}) => {
  const removeFromList = async () => {
    if (!user && !user?.displayName) {
      toast('Ups, está no es tu lista')
    } else {
      console.log('hola')

      toast.promise(removePostFromList(post.post_id, user.uid), {
        loading: 'Eliminando de tu lista...',
        success: () => {
          setUserListItems((state) =>
            state.filter((item) => item.id != post.id)
          )
          return 'Tattoo eliminado 😉'
        },
        error: (err) => {
          return `${err.toString()}`
        },
      })
    }
  }
  console.log(post, 'el post')

  return (
    <div>
      <Link
        href={
          user?.searching_city
            ? `/tatuajes/${post.post_id}/${user?.searching_city?.city_name}--${user?.searching_city?.province}--${user?.searching_city?.city_hash}/?listId=${post.list_id}`
            : `/tatuajes/${post.post_id}/Todo-Colombia--país--colombia/?listId=${post.list_id}`
        }
        scroll={false}
      >
        <a>
          <img
            // src="https://via.placeholder.com/309x234"
            src={
              post?.post_image
                ? `${post.post_image}/tr:pr-true,c-at_max,f-auto,h-235,q-100`
                : 'https://via.placeholder.com/309x234'
            }
            alt=""
            className="w-full rounded-sm  object-cover"
          />
        </a>
      </Link>
      <div className="flex justify-between mt-2">
        <div className="flex items-center space-x-2">
          <span className="text-gray-300">Por: </span>
          <p className="text-white text-sm">
            {post.post_artist_name || 'Sin nombre'}
          </p>
        </div>
        <div className="flex space-x-5">
          <div className="flex items-center space-x-2 text-white">
            <span className="cursor-pointer" onClick={removeFromList}>
              <RiHeart3Fill />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListPost
