import useLists from 'hooks/use-lists'
import Link from 'next/link'

const ShowLists = ({ userId }) => {
  const [lists] = useLists(userId)

  if (!lists) return <p className="text-gray-300"> Cargando listas...</p>

  return (
    <div className="text-gray-300">
      <h1 className="text-xl mb-5">Tus listas actuales</h1>

      <div className="flex flex-col">
        {lists.map((list) => (
          <Link href="#" key={list.id}>
            <a className="py-3">{list.list_name}</a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ShowLists
