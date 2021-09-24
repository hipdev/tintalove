import Link from 'next/link'
import { RiHeart3Fill } from 'react-icons/ri'
import toast from 'react-hot-toast'
import { removePostFromList } from 'lib/queries/lists'
import { UserState } from 'types/user'
import { PostTypes } from 'types/post'

const ListPost = ({
  list,
  mutateList,
  user,
}: {
  list: { id: string; posts: PostTypes }
  mutateList: any
  user: UserState
}) => {
  const removeFromList = async (postId) => {
    if (!user && !user?.displayName) {
      toast('Ups, está no es tu lista')
    } else {
      toast.promise(removePostFromList(postId, user.id), {
        loading: 'Eliminando de tu lista...',
        success: () => {
          mutateList()
          return 'Tattoo eliminado 😉'
        },
        error: (err) => {
          return `${err.toString()}`
        },
      })
    }
  }

  return (
    <div>
      <Link href={`/tatuajes/${list.posts.id}`}>
        <a>
          <img
            src={
              list?.posts
                ? `${list?.posts.photo_info.url}/tr:pr-true,c-at_max,f-auto,h-235,q-100`
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
            {list?.posts.artists.name || 'Sin nombre'}
          </p>
        </div>
        <div className="flex space-x-5">
          <div className="flex items-center space-x-2 text-white">
            <span
              className="cursor-pointer"
              onClick={() => removeFromList(list.posts.id)}
            >
              <RiHeart3Fill />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListPost
