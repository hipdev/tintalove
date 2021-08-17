import { useStateMachine } from 'little-state-machine'
import { lists } from 'lib/actions'
import { getUserLists } from 'lib/queries/lists'
import useSWR from 'swr'
import { VscClose } from 'react-icons/vsc'
import { BsPlus } from 'react-icons/bs'
import ListImage from './ListImage'
import { useRouter } from 'next/router'

const ShowLists = ({ userId, setShowCreate }) => {
  const router = useRouter()
  const { data } = useSWR(userId ? ['get-list', userId] : null, getUserLists)
  const { state, actions }: any = useStateMachine({
    lists,
  })

  if (!data) return <p className="text-gray-300"> Cargando listas...</p>

  return (
    <div className="max-w-sm">
      <div className="flex mb-8 justify-between items-center">
        <h1 className="text-gr-100 text-2xl font-semibold">Favoritos</h1>
        <button
          onClick={() => actions.lists({ postId: null, listOpen: false })}
          className="bg-gr-800 hover:bg-gn-400 rounded-full p-3 items-center justify-center border border-gr-700 group"
        >
          <VscClose className="text-gr-200 group-hover:text-white text-2xl" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {data?.userLists?.map((list) => {
          return (
            <button
              onClick={() => {
                router.push(`/list/${list.id}`)
                actions.lists({ postId: null, listOpen: false })
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
      {data?.userLists.length < 1 && (
        <div>
          <p className="text-gray-400">
            Sin colecciones,{' '}
            <button
              onClick={() => setShowCreate(true)}
              className="inline text-primary hover:text-primaryHover"
            >
              crea la primera.
            </button>
          </p>
        </div>
      )}

      <button
        onClick={() => setShowCreate(true)}
        className="fixed right-9 bottom-10 text-gr-100 text-sm bg-gn-400 hover:bg-primaryHover p-2 sm:p-3 rounded-md flex justify-center items-center"
      >
        CREAR LISTA <BsPlus className="text-2xl ml-1" />
      </button>
    </div>
  )
}

export default ShowLists
