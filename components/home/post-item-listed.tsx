import Modal from 'react-modal'
import { useStateMachine } from 'little-state-machine'
import { RiHeart3Fill, RiHeartLine } from 'react-icons/ri'
import { lists } from 'lib/actions'
import { PostTypes } from 'types/post'
import toast from 'react-hot-toast'
import { isPostListed, removePostFromList } from 'lib/queries/lists'
import { UserState } from 'types/user'
import useSWR from 'swr'
import { useState } from 'react'

Modal.setAppElement('#__next')

const PostItemListed = ({
  post,
  user,
  mutatePost,
}: {
  post: PostTypes
  user: UserState
  mutatePost: any
}) => {
  const [isOpen, setIsOpen] = useState(false)

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
      setIsOpen(false)
      toast('Ups, está no es tu lista')
    } else {
      console.log('hola')

      toast.promise(removePostFromList(post.id, user.uid), {
        loading: 'Eliminando de tu lista...',
        success: () => {
          setIsOpen(false)
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
      <Modal
        isOpen={isOpen}
        // style={customStyles}
        style={{
          overlay: {
            position: 'fixed',
            backgroundColor: 'rgb(8 10 18 / 98%)',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            zIndex: 100,
          },
          content: {
            background: 'transparent',
            border: 'none',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Post modal"
      >
        <div className="bg-black container mx-auto w-448 h-1/2 p-10">
          <h2 className="text-gray-400">
            ¿Estas seguro que deseas eliminar este post?
          </h2>
          <div className="text-gray-400 flex justify-center mt-5 text-xl">
            <button
              className="mr-5 border px-4 py-1 rounded-md"
              onClick={removeFromList}
            >
              Eliminar
            </button>
            <button>Cancelar</button>
          </div>
        </div>
      </Modal>

      {data?.listed ? (
        <span className="cursor-pointer" onClick={() => setIsOpen(true)}>
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
