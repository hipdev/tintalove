import { listenArtistById, listenArtistWizardById } from 'lib/db-realtime'
import { useEffect, useState } from 'react'

const useArtistWizardRealtime = (uid) => {
  const [artistWizard, setArtistWizard] = useState(null)

  useEffect(() => {
    if (uid) {
      const unsub = listenArtistWizardById(uid, setArtistWizard)

      return () => unsub()
    }
  }, [])

  return { artistWizard }
}

export default useArtistWizardRealtime
