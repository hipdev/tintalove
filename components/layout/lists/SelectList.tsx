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

  const { data } = useSWR(userId ? ['get-list', userId] : null, getUserLists)

  const {
    state: { list },
    actions,
  }: any = useStateMachine({
    lists,
  })

  console.log(list, 'lista select')

  useEffect(() => {
    if (data?.userLists.length < 1) {
      setShowForm(true)
    }
  }, [])

  const savePostOnList = (listId) => {
    if (listId && userId && post) {
      console.log(list, 'la lista')
      toast.promise(addPostToList(userId, post, listId), {
        loading: 'Agregando tattoo...',
        success: (res) => {
          console.log(res, 'la res')
          list.mutateListed({ listed: true }, false)
          list.mutatePost((data) => {
            return {
              post: {
                ...data.post,
                counter_listed: data.post.counter_listed + 1,
              },
            }
          }, false)

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

  if (!data) return <p className="text-gray-300"> Cargando listas...</p>

  return (
    <div>
      <div>
        <div className="w-full h-24 flex items-center justify-between mb-2">
          <h1 className="text-gr-100 text-2xl font-semibold">Colecciones</h1>
          <button
            className="bg-gr-800 hover:bg-gn-400 rounded-full p-3 items-center justify-center border border-gr-700"
            onClick={() => actions.lists({ postId: null, listOpen: false })}
          >
            <VscClose className="text-gr-200 hover:text-gray-100 text-2xl" />
          </button>
        </div>
      </div>

      {showForm && <NoListForm user={user} />}

      {/*<div>
        {data.userLists.map((list) => (
          <div
            className="flex items-center mb-5 bg-gr-800 p-4 rounded-md"
            key={list.id}
          >
            <div className="w-20 h-20 bg-gray-500 rounded-lg mr-5 flex-shrink-0"></div>

            <button
              className="w-full flex flex-col focus:outline-none"
              type="button"
              onClick={() => savePostOnList(list.id)}
            >
              {list.list_name}
              <span className="text-light-600 text-sm align-top">
                1 publicación
              </span>
            </button>
          </div>
        ))}
      </div> */}
      <div className="grid grid-cols-2 gap-6">
        {data?.userLists?.map((list) => {
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
                {list.list_name}
              </p>
            </button>
          )
        })}
      </div>

      <button
        // onClick={() => setShowCreate(true)}
        className="absolute right-9 bottom-10 text-gr-100 text-sm bg-gn-400 hover:bg-primaryHover p-2 sm:p-3 rounded-md flex justify-center items-center"
      >
        CREAR COLECCIÓN <BsPlus className="text-2xl ml-1" />
      </button>
    </div>
  )
}

export default SelectList
