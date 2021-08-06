import { onAuthStateChanged } from '@firebase/auth'
import { auth } from 'lib/firebase'
import { useEffect, useState } from 'react'

const useUserId = () => {
  const [userId, setUserId] = useState(null)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // user.getIdTokenResult()
        // .then(({ claims }) => console.log(claims, 'los tokens'))

        const uid = user.uid
        return setUserId(uid)
      } else {
        return setUserId(null)
      }
    })

    return () => unsub()
  })

  return { userId }
}

export default useUserId
