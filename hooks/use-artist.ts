import { getArtistInfo } from 'lib/queries/artists'
import { useEffect, useState } from 'react'

const useArtist = (uid) => {
  const [artist, setArtist] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      const { artist } = await getArtistInfo(uid)
      setArtist(artist)
    }
    fetch()
  }, [])

  return { artist }
}

export default useArtist
