import { getStudioInfo } from 'lib/db'
import { useEffect, useState } from 'react'

const useStudio = (uid) => {
  const [studio, setStudio] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      if (uid) {
        const { studio } = await getStudioInfo(uid)
        setStudio(studio)
      }
    }
    fetch()
  }, [])

  return { studio }
}

export default useStudio
