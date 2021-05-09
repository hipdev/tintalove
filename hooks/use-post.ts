import { getPostDataById } from 'lib/queries/posts'
import { useEffect, useState } from 'react'

const usePost = (id) => {
  const [post, setPost] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      if (id) {
        const { post } = await getPostDataById(id)
        console.log(post, 'id del post en hook')

        setPost(post)
      }
    }
    fetch()
  }, [])

  return { post }
}

export default usePost
