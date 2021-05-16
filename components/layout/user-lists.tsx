import { useState } from 'react'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import Modal from 'react-modal'

Modal.setAppElement('#__next')

const UserLists = () => {
  const [openSide, setOpenSide] = useState(false)

  return (
    <>
      <Modal
        isOpen={openSide}
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
        onRequestClose={() => setOpenSide(false)}
        contentLabel="Post modal"
      >
        <h1>Tus listas</h1>
        <p className="text-gray-300">Crea tu primera lista</p>
        <input type="text" placeholder="Nombre de la lista" />
      </Modal>

      <div className="fixed bottom-1/2 right-7 text-2xl z-20">
        <AiOutlineUnorderedList
          className="text-white cursor-pointer"
          onClick={() => setOpenSide(true)}
        />
      </div>
    </>
  )
}

export default UserLists
