import { getArtistsInfo } from 'lib/queries/artists'
import { useEffect, useState } from 'react'

const useArtists = () => {
  const [artists, setArtists] = useState([])

  useEffect(() => {
    const fetch = async () => {
      const { artists } = await getArtistsInfo()
      setArtists(artists)
    }
    fetch()
  }, [])

  return { artists }
}

export default useArtists
