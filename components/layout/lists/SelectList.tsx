import { addPostToList, getUserLists } from 'lib/queries/lists'
import { useStateMachine } from 'little-state-machine'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import NoListForm from './NoListForm'
import { lists } from 'lib/actions'
import useSWR from 'swr'
import { VscClose } from 'react-icons/vsc'
import ListImage from './ListImage'
import { BsPlus } from 'react-icons/bs'

const SelectList = ({ userId, post, user }) => {
  const [showForm, setShowForm] = useState(false)

  const { data: userLists } = useSWR(
    userId ? ['getUserLists', userId] : null,
    getUserLists
  )

  const {
    state: { list },
    actions,
  }: any = useStateMachine({
    lists,
  })

  useEffect(() => {
    if (userLists?.length < 1) {
      setShowForm(true)
    }
  }, [userLists])

  const savePostOnList = (listId) => {
    if (listId && userId && post) {
      toast.promise(addPostToList(userId, post.id, listId), {
        loading: 'Agregando tattoo...',
        success: (res) => {
          list.mutateListed(true, false)

          actions.lists({ post: null, listOpen: false })

          return 'Tattoo guardado 😉'
        },
        error: (err) => {
          return `${err.toString()}`
        },
      })
    } else {
      toast('Error: Sin suficientes datos')
    }
  }

  if (!userLists) return <p className="text-gray-300"> Cargando listas...</p>

  return (
    <div>
      <div>
        <div className="w-full h-24 flex items-center justify-between mb-2">
          <h1 className="text-gr-100 text-2xl font-semibold">
            Seleccionar lista
          </h1>
          <button
            className="bg-gr-800 hover:bg-gn-400 rounded-full p-3 items-center justify-center border border-gr-700 group"
            onClick={() => actions.lists({ postId: null, listOpen: false })}
          >
            <VscClose className="text-gr-200 group-hover:text-white text-2xl" />
          </button>
        </div>
      </div>

      {showForm && <NoListForm user={user} setShowCreate={setShowForm} />}

      <div className="grid grid-cols-2 gap-6">
        {userLists?.map((list) => {
          return (
            <button
              onClick={() => {
                savePostOnList(list.id)
              }}
              className="group"
              key={list.id}
            >
              <div className="  rounded-lg overflow-hidden w-48 h-48">
                <ListImage listId={list?.id} />
              </div>
              <p className="text-gray-400 mt-2 group-hover:text-gray-100">
                {list.name}
              </p>
            </button>
          )
        })}
      </div>

      <button
        onClick={() => setShowForm(true)}
        className="fixed right-9 bottom-10 text-gr-100 text-sm bg-gn-400 hover:bg-primaryHover p-2 sm:p-3 rounded-md flex justify-center items-center"
      >
        CREAR LISTA <BsPlus className="text-2xl ml-1" />
      </button>
    </div>
  )
}

export default SelectList
