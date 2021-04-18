import { listenArtistById } from 'lib/db-realtime'
import { useEffect, useState } from 'react'

const useArtistRealtime = (uid) => {
  const [artist, setArtist] = useState(null)

  useEffect(() => {
    if (uid) {
      const unsub = listenArtistById(uid, setArtist)

      return () => unsub()
    }
  }, [])

  return { artist }
}

export default useArtistRealtime
