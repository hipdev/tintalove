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
            backgroundColor: 'rgb(8 10 18 / 98%)',
            top: 80,
            right: 0,
            left: 0,
            bottom: 0,
          },
          content: {
            background: 'transparent',
            border: 'none',
            top: 0,
          },
        }}
        onRequestClose={() => setOpenSide(false)}
        contentLabel="Post modal"
      >
        <span>Hola soy el modal</span>
      </Modal>

      <div className="fixed bottom-1/2 right-8 text-2xl">
        <AiOutlineUnorderedList
          className="text-white cursor-pointer"
          onClick={() => setOpenSide(true)}
        />
      </div>
    </>
  )
}

export default UserLists
