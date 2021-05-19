import { useStateMachine } from 'little-state-machine'
import { useState } from 'react'
import { lists } from 'lib/actions'
import toast from 'react-hot-toast'
import { addPostToList, createList } from 'lib/queries/lists'
import { useUserData } from 'hooks/use-user-data'

const NoListForm = () => {
  const [listName, setListName] = useState('')
  const { setTriggerAuth } = useUserData()

  const {
    state: { list, user },
    actions,
  }: any = useStateMachine({
    lists,
  })

  console.log(list, user, 'estados')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (list.post?.id) {
      console.log(list.post, 'list post')
      toast.promise(createList(user, listName, true), {
        loading: 'Creando lista y asignando el tattoo...',
        success: (res: { doc: string; status: boolean }) => {
          console.log(res, 'la res')
          toast.promise(addPostToList(user.uid, list.post, res.doc), {
            loading: 'Asignando lista...',
            success: () => {
              setListName('')
              actions.lists({ post: null, listOpen: false })
              list.setIsListed(true)
              setTriggerAuth(Math.random())

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
    <>
      <p className="text-gray-300">Crea tu primera lista</p>

      <form onSubmit={handleSubmit} className="text-gray-400 flex flex-col">
        <input
          type="text"
          value={listName}
          placeholder="Nombre de la lista"
          onChange={(e) => setListName(e.target.value)}
        />
        <button type="submit">Crear</button>
      </form>
    </>
  )
}

export default NoListForm
