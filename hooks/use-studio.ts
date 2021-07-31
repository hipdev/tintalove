import { getStudioInfo } from 'lib/queries/studios'
import { useEffect, useState } from 'react'

const useStudio = (uid) => {
  const [studio, setStudio] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      if (uid) {
        const { studio } = await getStudioInfo('_', uid)
        setStudio(studio)
      }
    }
    fetch()
  }, [])

  return { studio }
}

export default useStudio
