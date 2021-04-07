import { getUsersRealtime } from 'lib/db-admin'
import { useEffect, useState } from 'react'

const useUsers = () => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      console.log('buscando users')
      const { users } = await getUsersRealtime()
      setUsers(users)
    }
    fetch()
  }, [])

  return { users }
}

export default useUsers
