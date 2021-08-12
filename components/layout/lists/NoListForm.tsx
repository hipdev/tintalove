import { useStateMachine } from 'little-state-machine'
import { useState } from 'react'
import { lists } from 'lib/actions'
import toast from 'react-hot-toast'
import { addPostToList, createList } from 'lib/queries/lists'
import { UserState } from 'types/user'
import { BsPlus } from 'react-icons/bs'

type Props = {
  user: UserState
  setShowCreate?: any
}

const NoListForm = ({ user, setShowCreate }: Props) => {
  const [listName, setListName] = useState('')

  const {
    state: { list },
    actions,
  }: any = useStateMachine({
    lists,
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (listName !== '') {
      if (list.post?.id) {
        toast.promise(createList(user, listName), {
          loading: 'Creando lista y asignando el tattoo...',
          success: (res: { doc: string; status: boolean }) => {
            toast.promise(addPostToList(user.uid, list.post, res.doc), {
              loading: 'Asignando lista...',
              success: () => {
                // setTriggerAuth(Math.random())
                setListName('')
                actions.lists({ post: null, listOpen: false })

                list.mutateListed({ listed: true }, false)
                list.mutatePost((data) => {
                  return {
                    post: {
                      ...data.post,
                      counter_listed: data.post.counter_listed + 1,
                    },
                  }
                }, false)

                return 'Tattoo guardado 😉'
              },
              error: (err) => {
                return `${err.toString()}`
              },
            })

            return 'Lista creada...'
          },
          error: (err) => {
            return `${err.toString()}`
          },
        })
      } else {
        toast.promise(createList(user, listName), {
          loading: 'Creando lista...',
          success: () => {
            setShowCreate(false)
            return 'Lista creada'
          },
          error: (err) => {
            return `${err.toString()}`
          },
        })
      }
    } else {
      toast('Debes asignar un valor a la lista')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-5">
      <div className="bg-gr-700 p-2 rounded-md mb-2 border border-gr-600">
        <div className="flex items-center">
          {list?.post && (
            <img
              className="w-12 h-12 object-cover rounded-md"
              src={`${list?.post?.image?.url}/tr:pr-true,c-at_max,f-auto,w-50,q-90`}
            />
          )}

          <div className="w-full">
            <label className="flex items-center w-full">
              <input
                autoFocus
                type="text"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                className="bg-transparent px-3 placeholder-gr-300 w-full rounded-md py-2 text-gr-100"
                placeholder="Nombre de la colección"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="flex text-gr-100 space-x-2">
        <button
          type="button"
          onClick={() => setShowCreate(false)}
          className="text-sm bg-gr-800 hover:bg-gr-600 p-3 rounded-md w-1/2"
        >
          CANCELAR
        </button>
        <button
          type="submit"
          className="text-sm bg-gn-400 hover:bg-primaryHover p-2 sm:p-3 rounded-md w-full flex justify-center items-center"
        >
          NUEVA COLECCIÓN <BsPlus className="text-2xl ml-1" />
          {/* Me tome la libertad de quitar la palabra CREAR del botón, creo que el icono ayuda mucho a intuir que es lo que hace y además ayuda mucho al repsonsive :D */}
        </button>
      </div>
    </form>
  )
}

export default NoListForm
