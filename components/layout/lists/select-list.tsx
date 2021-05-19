import useLists from 'hooks/use-lists'
import { useState } from 'react'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import NoListForm from './no-list-form'

const SelectList = ({ userId, post }) => {
  const [lists] = useLists(userId)
  const [showForm, setShowForm] = useState(false)

  console.log(lists, 'listas del usuario')

  if (!lists) return <p className="text-gray-300">Cargando listas...</p>

  return (
    <div className="text-gray-300">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-xl">Selecciona tu lista</h1>

        <button
          className="outline-none focus:outline-none"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? (
            <AiFillMinusCircle className="text-primary text-3xl hover:text-primaryHover" />
          ) : (
            <AiFillPlusCircle className="text-primary text-3xl hover:text-primaryHover" />
          )}
        </button>
      </div>

      {showForm && <NoListForm hasList />}

      <div>
        {lists.map((list) => (
          <button key={list.id} type="button">
            {list.list_name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SelectList