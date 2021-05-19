import { getUserLists } from 'lib/queries/lists'
import { useEffect, useState } from 'react'

const useLists = (uid) => {
  const [userLists, setUserLists] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      if (uid) {
        const { userLists } = await getUserLists(uid)
        setUserLists(userLists)
      }
    }
    fetch()
  }, [])

  return [userLists]
}

export default useLists
