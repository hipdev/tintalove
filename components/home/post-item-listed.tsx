import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useStateMachine } from 'little-state-machine'
import { RiHeart3Fill, RiHeartLine } from 'react-icons/ri'
import { lists } from 'lib/actions'
import { PostTypes } from 'types/post'
import toast from 'react-hot-toast'
import { isPostListed, removePostFromList } from 'lib/queries/lists'
import { UserState } from 'types/user'
import useSWR from 'swr'
import Script from 'next/script'

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

  return (
    <>
      <Script src="https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js" />
      <Script src="https://www.gstatic.com/firebasejs/8.6.2/firebase-firestore.js" />
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed z-10 inset-0 overflow-y-auto"
          open={isOpen}
          onClose={setIsOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  {/* <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                </div> */}
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Eliminar de tu lista
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Esta seguro de eliminar este tattoo ?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm"
                    onClick={() => removeFromList()}
                  >
                    Sí, eliminar.
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

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
