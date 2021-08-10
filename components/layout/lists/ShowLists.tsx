import { useStateMachine } from 'little-state-machine'
import Link from 'next/link'
import { lists } from 'lib/actions'
import { getUserLists } from 'lib/queries/lists'
import useSWR from 'swr'
import { VscClose } from 'react-icons/vsc'
import { BsPlus } from 'react-icons/bs'
import ListImage from './ListImage'

const ShowLists = ({ userId }) => {
  // const [userLists] = useLists(userId)

  const { data } = useSWR(userId ? ['get-list', userId] : null, getUserLists)

  console.log(data, 'data list')

  const { state, actions }: any = useStateMachine({
    lists,
  })

  if (!data) return <p className="text-gray-300"> Cargando listas...</p>

  return (
    <div className="max-w-sm">
      <div className="flex mb-8 justify-between items-center">
        <h1 className="text-gr-100 text-2xl font-semibold">Colecciones</h1>
        <button className="bg-gr-800 hover:bg-gn-400 rounded-full p-3 items-center justify-center border border-gr-700">
          <VscClose className="text-gr-200 hover:text-gray-100 text-2xl" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {data?.userLists?.map((list) => {
          return (
            <div key={list.id}>
              <div className=" bg-gray-400 rounded-lg overflow-hidden w-48 h-48">
                <ListImage listId={list?.id} />
              </div>
              <p className="text-gray-400 mt-2">{list.list_name}</p>
            </div>
          )
        })}
      </div>
      <button className="absolute right-9 bottom-10 text-gr-100 text-sm bg-gn-400 hover:bg-primaryHover p-2 sm:p-3 rounded-md flex justify-center items-center">
        CREAR COLECCIÓN <BsPlus className="text-2xl ml-1" />
      </button>
    </div>
  )
}

export default ShowLists
