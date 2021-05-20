import { useStateMachine } from 'little-state-machine'
import { useState } from 'react'
import { lists } from 'lib/actions'
import toast from 'react-hot-toast'
import { addPostToList, createList } from 'lib/queries/lists'
import { useUserData } from 'hooks/use-user-data'

type Props = {
  hasList?: boolean
}

const NoListForm = ({ hasList }: Props) => {
  const [listName, setListName] = useState('')
  const { setTriggerAuth } = useUserData()

  const {
    state: { list, user },
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
              setTriggerAuth(Math.random())
              setListName('')
              actions.lists({ post: null, listOpen: false })
              list.setIsListed(true)

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
    <div className="mb-10">
      <p className="text-gray-300">
        {hasList ? 'Crear lista' : 'Crea tu primera lista'}
      </p>

      <form onSubmit={handleSubmit} className="text-gray-400 flex flex-col">
        <input
          type="text"
          value={listName}
          placeholder="Nombre de la lista"
          onChange={(e) => setListName(e.target.value)}
          className="input-primary mt-3"
        />
        <button type="submit" className="mt-4 hover:text-primaryHover">
          Enviar
        </button>
      </form>
    </div>
  )
}

export default NoListForm
