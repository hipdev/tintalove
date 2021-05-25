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

      <div className="flex flex-col">
        {data.userLists.map((list) => (
          <Link href={`/list/${list.id}`} key={list.id}>
            <a
              className="py-3"
              onClick={() => actions.lists({ post: null, listOpen: false })}
            >
              {list.list_name}
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ShowLists
