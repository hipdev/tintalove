import { addPostToList, getUserLists } from 'lib/queries/lists'
import { useStateMachine } from 'little-state-machine'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import NoListForm from './no-list-form'
import { lists } from 'lib/actions'
import useSWR from 'swr'
import { FiPlus } from 'react-icons/fi'
import { VscClose } from 'react-icons/vsc'
import Link from 'next/link'

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
    <div className="text-gray-300">
      <div className="flex justify-between items-center">
        <div className="bg-ocean_blue-300 w-full h-24 flex items-center justify-around mb-6">
          <h1 className="text-white text-2xl font-semibold">Mis favoritos</h1>
          {showForm ? (
            <button
              className="bg-light-600 hover:bg-light-900 p-2 rounded-md focus:outline-none"
              onClick={() => setShowForm(!showForm)}
            >
              <VscClose className="text-white text-3xl" />
            </button>
          ) : (
            <button
              className="bg-primary hover:bg-primaryHover p-2 rounded-md focus:outline-none"
              onClick={() => setShowForm(!showForm)}
            >
              <FiPlus className="text-white text-3xl" />
            </button>
          )}
        </div>
      </div>

      {showForm && <NoListForm user={user} hasList />}

      <div>
        {data.userLists.map((list) => (
          <div className="flex items-center mb-5 bg-ocean_blue-300 p-4 rounded-md">
            <div className="w-20 h-20 bg-gray-500 rounded-lg mr-5 flex-shrink-0"></div>

            <button
              className="flex flex-col w-full focus:outline-none"
              key={list.id}
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
      </div>
    </div>
  )
}

export default SelectList
