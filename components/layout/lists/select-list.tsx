import useLists from 'hooks/use-lists'
import Link from 'next/link'

const SelectList = ({ userId }) => {
  const [lists] = useLists(userId)

  console.log(lists, 'listas del usuario')

  if (!lists) return <p className="text-gray-300">Cargando listas...</p>

  return (
    <div className="text-gray-300">
      <h1 className="text-xl mb-10">Tus listas</h1>

      {lists.map((list) => (
        <Link href="#" key={list.id}>
          <a>{list.list_name}</a>
        </Link>
      ))}
    </div>
  )
}

export default SelectList
