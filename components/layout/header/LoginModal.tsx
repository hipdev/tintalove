import dynamic from 'next/dynamic'
import Modal from 'react-modal'
import { AiOutlineGoogle } from 'react-icons/ai'
import { CgCloseO } from 'react-icons/cg'
import { useState } from 'react'

const PhoneInput = dynamic(() => import('./PhoneAuth/PhoneInput'), {
  ssr: false,
})

const LoginModal = ({ modal, handleLogin }: any) => {
  const [showPhoneButton, setShowPhoneButton] = useState(true)

  return (
    <>
      <Modal
        isOpen={modal.isOpen}
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
        onRequestClose={() => modal.setIsOpen(false)}
        contentLabel="Post modal"
      >
        <div className="bg-gr-800  text-gray-300 px-14 py-5 pb-10 relative">
          {showPhoneButton && (
            <h2 className="text-gray-300 font-semibold text-2xl text-center mb-7">
              Ingresar en Tinta Love
            </h2>
          )}

          <div className=" flex flex-col justify-center">
            {showPhoneButton && (
              <>
                <button
                  className="flex items-center justify-center border py-2 mb-3 rounded-md px-2 bg-dark-800 border-black"
                  onClick={handleLogin}
                >
                  Entrar con Gmail <AiOutlineGoogle className="text-xl ml-3" />
                </button>
                <div className="text-center">ó</div>
              </>
            )}
            <PhoneInput
              show={{ showPhoneButton, setShowPhoneButton }}
              modal={modal}
            />
          </div>

          <div
            className="absolute -top-3 right-2  sm:-right-2 "
            onClick={() => modal.setIsOpen(false)}
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
