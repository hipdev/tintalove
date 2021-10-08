import Modal from 'react-modal'
import { AiOutlineGoogle } from 'react-icons/ai'
import { CgCloseO } from 'react-icons/cg'
import { useContext, useState } from 'react'
import { LoginContext } from 'pages/_app'
import { supabase } from 'lib/supabase-client'
import toast from 'react-hot-toast'

const LoginModal = () => {
  const { isOpen, setIsOpen } = useContext(LoginContext)

  const [email, setEmail] = useState('')

  const handleLoginProvider = async (provider) => {
    const { user, session, error } = await supabase.auth.signIn({
      provider,
    })
  }

  const handleMagicLink = async (e) => {
    e.preventDefault()
    const { user, session, error } = await supabase.auth.signIn({
      email,
    })

    toast('Enviamos un link de acceso a tu correo', { duration: 5000 })
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
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
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Post modal"
      >
        <div className="bg-gr-800  text-gray-300 px-5 sm:px-10 py-5 pb-10 relative">
          <h2 className="text-gray-300 font-semibold text-2xl text-center mb-7">
            Ingresar en Tinta Love
          </h2>

          <div className=" flex flex-col justify-center">
            <button
              type="button"
              className="flex items-center justify-center border py-2 mb-3 rounded-md px-2 bg-dark-800 border-black"
              onClick={() => handleLoginProvider('google')}
            >
              Entrar con Gmail <AiOutlineGoogle className="text-xl ml-3" />
            </button>

            {/* Me falta tener las politicas de privacidad para hacer el login con twitter  */}
            {/* <button
              type="button"
              className="flex items-center justify-center border py-2 mb-3 rounded-md px-2 bg-dark-800 border-black"
              onClick={() => handleLoginProvider('twitter')}
            >
              Entrar con Twitter <FiTwitter className="text-xl ml-3" />
            </button> */}
            <div className="text-center">ó</div>
            <form className="flex flex-col" onSubmit={handleMagicLink}>
              <input
                type="email"
                className="input-primary mt-2 mb-3 text-center"
                placeholder="Correo"
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button className="hover:underline" type="submit">
                Entrar con correo
              </button>
            </form>
          </div>

          <div
            className="absolute -top-3 right-2  sm:-right-2 "
            onClick={() => setIsOpen(false)}
          >
            <CgCloseO className="text-white text-3xl cursor-pointer" />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default LoginModal
