import { auth } from 'lib/firebase'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { useStateMachine } from 'little-state-machine'
import { login, getUser } from 'lib/actions'
import { getUserInfo } from 'lib/db'

export function useUserData() {
  const [userInfo, setUserInfo] = useState(null)
  const [triggerAuth, setTriggerAuth] = useState(null)
  const { state }: any = useStateMachine({
    login,
  })
  const { userState, actions }: any = useStateMachine({
    getUser,
  })

  useEffect(() => {
    const authSubs = onAuthStateChanged(auth, (user: User) => {
      if (user) {
        const fetchUser = async function () {
          const userData = await getUserInfo(user.uid)
          if (userData) {
            user.getIdTokenResult()
            // .then(({ claims }) => console.log(claims, 'los tokens'))

            setUserInfo(user.providerData[0])
            // console.log(userData, 'datafromuser')

            actions.getUser({
              email: user.email,
              username: userData.username,
              displayName: userData.displayName || user.displayName,
              uid: user.uid,
              photo: user.photoURL,
              ...(userData.is_artist && { is_artist: userData.is_artist }),
              ...(userData.is_admin && { is_admin: userData.is_admin }),
              ...(userData.artist_active && {
                artist_active: userData.artist_active,
              }),
              ...(userData.studio_id && { studio_id: userData.studio_id }),
              ...(userData.has_studio && { has_studio: userData.has_studio }),
            })
          } else {
            actions.getUser(null)
          }
        }

        fetchUser()
      } else {
        actions.getUser(null)
        // console.log(user, "sin user");
      }
    })
    return authSubs()
  }, [state.login, triggerAuth])

  // console.log(userInfo, "data");
  return { user: userState, setTriggerAuth }
}
