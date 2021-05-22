import { addPostToList, getUserLists } from 'lib/queries/lists'
import { useStateMachine } from 'little-state-machine'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import NoListForm from './no-list-form'
import { lists } from 'lib/actions'
import useSWR from 'swr'

const SelectList = ({ userId, post }) => {
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
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-xl">Selecciona tu lista</h1>

        <button
          className="outline-none focus:outline-none"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? (
            <AiFillMinusCircle className="text-primary text-3xl hover:text-primaryHover" />
          ) : (
            <AiFillPlusCircle className="text-primary text-3xl hover:text-primaryHover" />
          )}
        </button>
      </div>

      {showForm && <NoListForm hasList />}

      <div className="flex flex-col">
        {data.userLists.map((list) => (
          <button
            key={list.id}
            type="button"
            className="py-3 px-2 hover:bg-dark-600 text-left"
            onClick={() => savePostOnList(list.id)}
          >
            {list.list_name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SelectList
