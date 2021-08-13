import { signInWithPopup } from '@firebase/auth'
import { auth } from 'lib/firebase'
import { provider } from './layout/Header/Submenu'
import { createUser } from 'lib/queries/users'
import useUserId from 'hooks/use-user-id'

export default function IsAuth({ children }) {
  const { userId } = useUserId()

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user
        const res = await createUser(user)
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        console.log(errorCode)
      })
  }

  if (userId) {
    return children
  } else {
    return (
      <div className="h-screen flex items-center justify-center bg-dark-800">
        <div className="text-white flex flex-col  items-center">
          <p className="mb-5 text-4xl font-semibold ">
            Verificando permisos...
          </p>
          <button
            onClick={handleLogin}
            className="btn-primary w-auto text-white px-5 py-3 mx-auto sm:mx-0 rounded-lg focus:outline-none"
          >
            Acceder
          </button>
        </div>
      </div>
    )
  }
}
