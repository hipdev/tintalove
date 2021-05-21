import { useStateMachine } from 'little-state-machine'
import Link from 'next/link'

import { FaRegCommentDots } from 'react-icons/fa'
import { RiHeart3Fill, RiHeartLine } from 'react-icons/ri'
import { lists } from 'lib/actions'
import { PostTypes } from 'types/post'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import useListed from 'hooks/use-listed'
import { removePostFromList } from 'lib/queries/lists'
import { UserState } from 'types/user'

const PostItem = ({ post, user }: { post: PostTypes; user: UserState }) => {
  const [isListed, setIsListed] = useState(false)
  const [listedCounter, setListedCounter] = useState(post.counter_listed || 0)

  const { state, actions }: any = useStateMachine({
    lists,
  })

  const { listed } = useListed(post.id, user?.uid)

  useEffect(() => {
    setIsListed(listed)
  }, [listed])

  useEffect(() => {
    setListedCounter((state) => state) // de esta manera actualizamos el me gusta localmente
  }, [listedCounter])

  const handleList = () => {
    if (!user && !user?.displayName) {
      toast('Entra para crear listas 🤩')
    } else {
      actions.lists({
        post: post,
        listOpen: true,
        setIsListed,
        setListedCounter,
      })
    }
  }
  const removeFromList = async () => {
    if (!user && !user?.displayName && (!isListed || !listed)) {
      toast('Ups, está no es tu lista')
    } else {
      console.log('hola')

      toast.promise(removePostFromList(post.id, user.uid), {
        loading: 'Eliminando de tu lista...',
        success: () => {
          setIsListed(false)
          setListedCounter((state) => state - 1)
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
            src={`${post.artist_picture}/tr:pr-true,c-at_max,f-auto,h-32,q-100`}
            className="w-7 h-7 bg-primary rounded-full"
          />
          <p className="text-white text-sm">
            {post.displayName || 'Sin nombre'}
          </p>
        </div>
        <div className="flex space-x-5">
          {post.counter_comments && (
            <div className="flex items-center space-x-2 text-white">
              <p className="">{post.counter_comments || 0}</p>
              <span>
                <FaRegCommentDots />
              </span>
            </div>
          )}
          <div className="flex items-center space-x-2 text-white">
            <p className="">{listedCounter || 0}</p>
            {isListed ? (
              <span className="cursor-pointer" onClick={removeFromList}>
                <RiHeart3Fill />
              </span>
            ) : (
              <span className="cursor-pointer" onClick={handleList}>
                <RiHeartLine />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem
