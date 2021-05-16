import { useStateMachine } from 'little-state-machine'
import { useState } from 'react'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import Modal from 'react-modal'
import { lists } from 'lib/actions'

Modal.setAppElement('#__next')

const UserLists = () => {
  const [listName, setListName] = useState('')

  const {
    state: { list, user },
    actions,
  }: any = useStateMachine({
    lists,
  })

  console.log(list, user, 'estados')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(listName, 'hola esta es tu lista')
  }

  return (
    <>
      <Modal
        isOpen={list?.listOpen || false}
        // style={customStyles}
        style={{
          overlay: {
            position: 'fixed',
            backgroundColor: 'rgb(8 10 18 / 33%)',
            top: 80,
            zIndex: 20,
          },
          content: {
            background: 'rgb(6 7 12)',
            position: 'fixed',
            border: 'none',
            // inset: 'auto',
            right: '0px',
            left: 'auto',
            top: '80px',
            height: '100%',
            width: '315px',
            borderRadius: '0',
          },
        }}
        onRequestClose={() => actions.lists({ postId: null, listOpen: false })}
        contentLabel="Post modal"
      >
        <h1 className="text-gray-300 text-xl">Tus listas</h1>
        {user?.has_list ? (
          <>
            <div>Lista lista lista</div>
          </>
        ) : (
          <>
            <p className="text-gray-300">Post: {list.postId}</p>
            <p className="text-gray-300">Crea tu primera lista</p>
            <form
              onSubmit={handleSubmit}
              className="text-gray-400 flex flex-col"
            >
              <input
                type="text"
                placeholder="Nombre de la lista"
                onChange={(e) => setListName(e.target.value)}
              />
              <button type="submit">Crear</button>
            </form>
          </>
        )}
      </Modal>

      <div className="fixed bottom-1/2 right-7 text-2xl z-20">
        <AiOutlineUnorderedList
          className="text-white cursor-pointer"
          onClick={() => actions.lists({ postId: null, listOpen: true })}
        />
      </div>
    </>
  )
}

export default UserLists
