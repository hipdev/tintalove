import { signInWithPopup } from '@firebase/auth'
import { auth } from 'lib/firebase'
import { provider } from './layout/header/Submenu'
import { createUser } from 'lib/queries/users'
import useUserId from 'hooks/use-user-id'
import Loading from './loading/loading'

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
        <Loading />
      </div>
    )
  }
}
