import { auth } from 'lib/firebase'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { useStateMachine } from 'little-state-machine'
import { login, getUser } from 'lib/actions'
import { getUserInfo } from 'lib/db'

export function useUserData() {
  const [userInfo, setUserInfo] = useState(null)
  const { state }: any = useStateMachine({
    login,
  })
  const { userState, actions }: any = useStateMachine({
    getUser,
  })

  useEffect(() => {
    const authSubs = onAuthStateChanged(auth, (user: User) => {
      if (user) {
        ;(async function getUser() {
          const userData = await await getUserInfo(user.uid)
          if (userData) {
            user
              .getIdTokenResult()
              .then(({ claims }) => console.log(claims, 'los tokens'))

            setUserInfo(user.providerData[0])
            console.log(userData, 'datafromuser')

            actions.getUser({
              email: user.email,
              displayName: userData.displayName || user.displayName,
              uid: user.uid,
              photo: user.photoURL,
              is_artist: userData.is_artist || false,
            })
          } else {
            actions.getUser(null)
          }
        })()
      } else {
        actions.getUser(null)
        // console.log(user, "sin user");
      }
    })
    return authSubs()
  }, [state.login])

  // console.log(userInfo, "data");
  return { user: userState }
}
