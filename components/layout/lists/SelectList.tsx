import { addPostToList, getUserLists } from 'lib/queries/lists'
import { useStateMachine } from 'little-state-machine'
import { useState } from 'react'
import toast from 'react-hot-toast'
import NoListForm from './NoListForm'
import { lists } from 'lib/actions'
import useSWR from 'swr'
import { VscClose } from 'react-icons/vsc'

const SelectList = ({ userId, post, user }) => {
  const [showForm, setShowForm] = useState(false)

  const { data } = useSWR(userId ? ['get-list', userId] : null, getUserLists)

  const {
    state: { list },
    actions,
  }: any = useStateMachine({
    lists,
  })

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
            onClick={() => setShowForm(showForm)}
          >
            <VscClose className="text-gr-200 hover:text-gray-100 text-2xl" />
          </button>
        </div>
      </div>

      {!showForm && <NoListForm user={user} hasList />}

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
              <span className="text-gr-600 text-sm align-top">
                1 publicación
              </span>
            </button>
          </div>
        ))}
      </div> */}

      <div>
        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <div className=" bg-gray-600 rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/208x208"
                alt=""
                className="w-full h-full object-fill"
              />
            </div>
            <p className="text-white mt-2">Tatuajes de animales</p>
          </div>
          <div className="">
            <div className=" bg-gray-600 rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/208x208"
                alt=""
                className="w-full h-full object-fill"
              />
            </div>
            <p className="text-white mt-2">Tatuajes en negro</p>
          </div>
          <div className="">
            <div className=" bg-gray-600 rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/208x208"
                alt=""
                className="w-full h-full object-fill"
              />
            </div>
            <p className="text-white mt-2">Tatuajes de animales</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectList
