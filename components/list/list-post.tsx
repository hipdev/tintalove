import { useStateMachine } from 'little-state-machine'
import Link from 'next/link'

import { RiHeart3Fill } from 'react-icons/ri'
import { lists } from 'lib/actions'
import toast from 'react-hot-toast'
import { useState } from 'react'

import { removePostFromList } from 'lib/queries/lists'
import { PostList } from 'types/post-list'

const ListPost = ({ post }: { post: PostList }) => {
  const [isListed, setIsListed] = useState(false)

  const {
    state: { user },
    actions,
  }: any = useStateMachine({
    lists,
  })

  const removeFromList = async () => {
    if (!user && !user?.displayName) {
      toast('Ups, está no es tu lista')
    } else {
      console.log('hola')

      toast.promise(removePostFromList(post.id, user.uid), {
        loading: 'Eliminando de tu lista...',
        success: () => {
          setIsListed(false)
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
      <Link
        href={`/tatuajes/${post.post_id}?listId=${post.list_id}`}
        as={`/tatuajes/${post.post_id}`}
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
