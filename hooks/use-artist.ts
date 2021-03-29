import { getArtistInfo } from 'lib/db'
import { useEffect, useState } from 'react'

const useArtist = (uid) => {
  const [artist, setArtist] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      console.log('buscando info del artista')
      const { artist } = await getArtistInfo(uid)
      setArtist(artist)
    }
    fetch()
  }, [])

  return { artist }
}

export default useArtist
