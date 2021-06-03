import { useStateMachine } from 'little-state-machine'
import Link from 'next/link'
import { lists } from 'lib/actions'
import { getUserLists } from 'lib/queries/lists'
import useSWR from 'swr'

const ShowLists = ({ userId }) => {
  // const [userLists] = useLists(userId)

  const { data } = useSWR(userId ? ['get-list', userId] : null, getUserLists)

  console.log(data, 'data list')

  const { state, actions }: any = useStateMachine({
    lists,
  })

  if (!data) return <p className="text-gray-300"> Cargando listas...</p>

  return (
    <div className="text-gray-300">
      <h1 className="text-xl mb-5">Tus listas</h1>
      <div>
        {data.userLists.map((list) => (
          <div className="flex items-center mb-5 bg-ocean_blue-300 p-4 rounded-md">
            <div className="w-20 h-20 bg-gray-500 rounded-lg mr-5 flex-shrink-0"></div>
            <div className="flex flex-col w-full">
              <Link href={`/list/${list.id}`} key={list.id}>
                <a
                  className="text-white"
                  onClick={() => actions.lists({ post: null, listOpen: false })}
                >
                  {list.list_name}
                </a>
              </Link>
              <span className="text-light-600 text-sm align-top">
                1 publicación
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShowLists
