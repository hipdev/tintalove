import { listenStudioWizardById } from 'lib/db-realtime'
import { useEffect, useState } from 'react'

const useStudioWizardRealtime = (uid) => {
  const [studioWizard, setStudioWizard] = useState(null)

  useEffect(() => {
    if (uid) {
      const unsub = listenStudioWizardById(uid, setStudioWizard)

      return () => unsub()
    }
  }, [])

  return { studioWizard }
}

export default useStudioWizardRealtime
