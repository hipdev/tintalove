import { onAuthStateChanged, User } from '@firebase/auth'
import { auth } from 'lib/firebase'
import { useEffect, useState } from 'react'

const useUserId = () => {
  const [userId, setUserId] = useState(null)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // user.getIdTokenResult()
      // .then(({ claims }) => console.log(claims, 'los tokens'))

      const uid = user.uid
      return setUserId(uid)
    } else {
      return setUserId(null)
    }
  })

  return { userId }
}

export default useUserId
