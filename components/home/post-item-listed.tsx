import { useStateMachine } from 'little-state-machine'
import { RiHeart3Fill, RiHeartLine } from 'react-icons/ri'
import { lists } from 'lib/actions'
import { PostTypes } from 'types/post'
import toast from 'react-hot-toast'
import { isPostListed, removePostFromList } from 'lib/queries/lists'
import { UserState } from 'types/user'
import useSWR from 'swr'

const PostItemListed = ({
  post,
  user,
  mutatePost,
}: {
  post: PostTypes
  user: UserState
  mutatePost: any
}) => {
  const { state, actions }: any = useStateMachine({
    lists,
  })

  const { data, mutate } = useSWR(
    user?.uid ? [post.id, user.uid] : null,
    isPostListed
  )

  const handleList = () => {
    if (!user && !user?.displayName) {
      toast('Entra para crear listas 🤩')
    } else {
      actions.lists({
        post: post,
        listOpen: true,
        mutateListed: mutate,
        mutatePost,
      })
    }
  }
  const removeFromList = async () => {
    if (!user && !user?.displayName) {
      toast('Ups, está no es tu lista')
    } else {
      console.log('hola')

      toast.promise(removePostFromList(post.id, user.uid), {
        loading: 'Eliminando de tu lista...',
        success: () => {
          mutatePost((data) => {
            return {
              post: {
                ...data.post,
                counter_listed: data.post.counter_listed - 1,
              },
            }
          }, false)
          mutate({ listed: false }, false)
          return 'Tattoo eliminado 😉'
        },
        error: (err) => {
          return `${err.toString()}`
        },
      })
    }
  }
  if (!data) return null

  return (
    <>
      {data?.listed ? (
        <span className="cursor-pointer" onClick={removeFromList}>
          <RiHeart3Fill />
        </span>
      ) : (
        <span className="cursor-pointer" onClick={handleList}>
          <RiHeartLine />
        </span>
      )}
    </>
  )
}

export default PostItemListed
