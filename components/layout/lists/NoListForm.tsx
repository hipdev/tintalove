import { useStateMachine } from 'little-state-machine'
import { useState } from 'react'
import { lists } from 'lib/actions'
import toast from 'react-hot-toast'
import { addPostToList, createList } from 'lib/queries/lists'
import { UserState } from 'types/user'
import { BsPlus } from 'react-icons/bs'

type Props = {
  hasList?: boolean
  user: UserState
}

const NoListForm = ({ hasList, user }: Props) => {
  const [listName, setListName] = useState('')

  const {
    state: { list },
    actions,
  }: any = useStateMachine({
    lists,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (list.post?.id) {
      toast.promise(createList(user, listName, hasList ? false : true), {
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
      toast('No existe el post')
    }
  }

  return (
    <div className="mb-5">
      <div className="bg-gr-700 p-2 rounded-md mb-2 border border-gr-600">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-white rounded-lg mr-2 flex-shrink-0 overflow-hidden">
            {/* w-12 y h-12 se pueden borrar junto con el bg-white es solo para que al renderizar se vea algo xD */}
            {/* <img
              //src={user.photoUrl} Pinte la foto pero despues me daba un error :/ porque no podía leer la propiedad 
              alt="User photo"
              className="object-cover w-12 h-12 "
            />
           */}
          </div>
          <div className="w-full">
            <form onSubmit={handleSubmit} className="flex items-center w-full">
              <input
                type="text"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                className="bg-transparent px-3 placeholder-gr-300 w-full rounded-md py-2 text-gr-100"
                placeholder="Nombre de la colección"
              />
            </form>
          </div>
        </div>
      </div>
      <div className="flex text-gr-100 space-x-2">
        <button className="text-sm bg-gr-800 hover:bg-gr-600 p-3 rounded-md w-1/2">
          CANCELAR
        </button>
        <button className="text-sm bg-gn-400 hover:bg-gn-500 p-2 sm:p-3 rounded-md w-full flex justify-center items-center">
          NUEVA COLECCIÓN <BsPlus className="text-2xl ml-1" />
          {/* Me tome la libertad de quitar la palabra CREAR del botón, creo que el icono ayuda mucho a intuir que es lo que hace y además ayuda mucho al repsonsive :D */}
        </button>
      </div>
    </div>
  )
}

export default NoListForm
