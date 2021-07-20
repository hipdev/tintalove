import Modal from 'react-modal'
import { SiGmail } from 'react-icons/si'
import { BsPhone } from 'react-icons/bs'
import { AiOutlineGoogle } from 'react-icons/ai'
import { CgCloseO } from 'react-icons/cg'

const LoginModal = ({ modal, handleLogin }: any) => {
  return (
    <>
      <Modal
        isOpen={modal.openModal}
        style={{
          overlay: {
            backgroundColor: 'rgb(11 14 25 / 80%)',
            top: 0,
            zIndex: 50,
            overflow: 'auto',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#000',
            border: 'none',
            padding: '2px',
            overflow: 'initial',
          },
        }}
        onRequestClose={() => modal.setOpenModal(false)}
        contentLabel="Post modal"
      >
        <div className="bg-gr-800  text-gray-300 px-14 py-5 pb-10 relative">
          <h2 className="text-gray-300 font-semibold text-2xl text-center">
            Ingresar en Tinta Love
          </h2>

          <div className="mt-10 flex flex-col justify-center">
            <button
              className="flex items-center justify-center border py-2 mb-5 rounded-md px-2 bg-dark-800 border-black"
              onClick={handleLogin}
            >
              Entrar con Gmail <AiOutlineGoogle className="text-xl ml-3" />
            </button>
            <div className="text-center">ó</div>
            <button className="flex items-center justify-center border py-2 mt-5 rounded-md px-2 bg-dark-800 border-black">
              Entrar con Celular <BsPhone className="text-xl ml-3" />
            </button>
          </div>

          <div
            className="absolute -top-3 -right-2 "
            onClick={() => modal.setOpenModal(false)}
          >
            <CgCloseO className="text-white text-3xl cursor-pointer" />
          </div>
          <p className="absolute -bottom-16 text-sm text-gray-400 text-center right-2">
            Al ingresar aceptas los{' '}
            <a className="text-gray-200" href="#">
              Términos y condiciones{' '}
            </a>
            y la{' '}
            <a href="#" className="text-gray-200">
              Política de privacidad.
            </a>
          </p>
        </div>
      </Modal>
    </>
  )
}

export default LoginModal
