import { onAuthStateChanged, User } from '@firebase/auth'
import { auth } from 'lib/firebase'
import { useEffect, useState } from 'react'

const useUserId = () => {
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const authSubs = onAuthStateChanged(auth, (user: User) => {
      if (user) {
        setUserId(user.uid)
      }
    })
    return authSubs()
  }, [])

  return { userId }
}

export default useUserId
