import { listenStudioWizardById } from 'lib/db-realtime'
import { useEffect, useState } from 'react'

const useStudioWizardRealtime = (studioId) => {
  const [studioWizard, setStudioWizard] = useState(null)

  useEffect(() => {
    if (studioId) {
      const unsub = listenStudioWizardById(studioId, setStudioWizard)

      return () => unsub()
    }
  }, [])

  return { studioWizard }
}

export default useStudioWizardRealtime
