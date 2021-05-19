import { isPostListed } from 'lib/queries/lists'
import usePromise from 'react-use-promise'

const useListed = (postId, userId) => {
  const fetch = async () => {
    if (postId && userId) {
      const { notListed } = await isPostListed(postId, userId)
      return notListed
    }
  }
  const [result, error, state] = usePromise(fetch, [])

  return { listed: result }
}

export default useListed
