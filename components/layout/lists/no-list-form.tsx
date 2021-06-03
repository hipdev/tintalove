import { useStateMachine } from 'little-state-machine'
import { useState } from 'react'
import { lists } from 'lib/actions'
import toast from 'react-hot-toast'
import { addPostToList, createList } from 'lib/queries/lists'
import { UserState } from 'types/user'
import { FiPlus } from 'react-icons/fi'

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
      <div className="bg-ocean_blue-300 p-4 rounded-md mb-6">
        <div className="flex items-center">
          <div className="w-20 h-20 bg-gray-500 rounded-lg mr-5 flex-shrink-0"></div>
          <div className="w-full">
            <p className="text-gray-300">
              {hasList ? 'Nueva Lista' : 'Crea tu primera lista'}
            </p>
            <form onSubmit={handleSubmit} className="flex items-center w-full">
              <input
                type="text"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                className="bg-transparent placeholder-white border-2 border-light-400 rounded-md py-2 mr-5 w-11/12 px-3"
                placeholder="Mis favoritos!"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primaryHover p-2 rounded-md focus:outline-none"
              >
                <span className="text-white text-3xl">
                  <FiPlus />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoListForm
