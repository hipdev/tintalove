import { getArtistInfo } from 'lib/queries/artists'
import { getUserLists } from 'lib/queries/lists'
import { useEffect, useState } from 'react'

const useLists = (uid) => {
  const [lists, setLists] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      if (uid) {
        const { lists } = await getUserLists(uid)
        setLists(lists)
      }
    }
    fetch()
  }, [])

  return [lists]
}

export default useLists
