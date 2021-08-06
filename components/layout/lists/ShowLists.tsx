import { useStateMachine } from 'little-state-machine'
import { lists } from 'lib/actions'
import { getUserLists } from 'lib/queries/lists'
import useSWR from 'swr'
import { VscClose } from 'react-icons/vsc'
import { BsPlus } from 'react-icons/bs'

const ShowLists = ({ userId }) => {
  // const [userLists] = useLists(userId)

  const { data } = useSWR(userId ? ['get-list', userId] : null, getUserLists)

  console.log(data, 'data list')

  const { state, actions }: any = useStateMachine({
    lists,
  })

  if (!data) return <p className="text-gray-300"> Cargando listas...</p>

  return (
    <div>
      <div className="flex mb-8 justify-between items-center">
        <h1 className="text-gr-100 text-2xl font-semibold">Colecciones</h1>
        <button className="bg-gr-800 hover:bg-gn-400 rounded-full p-3 items-center justify-center border border-gr-700">
          <VscClose className="text-gr-200 hover:text-gray-100 text-2xl" />
        </button>
      </div>
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
      <button className="absolute right-9 bottom-10 text-gr-100 text-sm bg-gn-400 hover:bg-gn-500 p-2 sm:p-3 rounded-md flex justify-center items-center">
        CREAR COLECCIÓN <BsPlus className="text-2xl ml-1" />
      </button>
    </div>
  )
}

export default ShowLists
