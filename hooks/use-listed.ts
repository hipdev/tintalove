import { isPostListed } from 'lib/queries/lists'
import { useEffect, useState } from 'react'

const useListed = (postId, userId) => {
  const [listed, setListed] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      if (postId && userId) {
        const { notListed } = await isPostListed(postId, userId)
        setListed(notListed)
      }
    }
    fetch()
  }, [])

  return { listed }
}

export default useListed
