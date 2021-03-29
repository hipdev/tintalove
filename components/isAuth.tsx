import { signInWithPopup } from '@firebase/auth'
import { useStateMachine } from 'little-state-machine'
import { login } from 'lib/actions'
import { auth } from 'lib/firebase'
import useUser from 'hooks/use-user'
import { createUser } from 'lib/db'
import { GoogleAuthProvider } from 'firebase/auth'

export default function IsAuth({ children }) {
  const { state } = useUser()
  const provider = new GoogleAuthProvider()
  const { state: loginState, actions } = useStateMachine({
    login,
  })

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user
        const res = await createUser(user)

        console.log(res, 'res no esta dando true hpta')

        if (res) actions.login(true)
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        console.log(errorCode)
      })
  }

  return (
    <>
      {state.user ? (
        children
      ) : (
        <div className="h-screen bg-gradient-to-r from-dark-700 to-black flex items-center justify-center">
          <div className="text-white flex flex-col  items-center">
            <p className="mb-5 text-4xl font-semibold ">
              Para acceder aquí debes loguearte
            </p>
            <button
              onClick={handleLogin}
              className="btn-red w-auto text-white px-5 py-3 mx-auto sm:mx-0 rounded-lg focus:outline-none"
            >
              Acceder
            </button>
          </div>
        </div>
      )}
    </>
  )
}
