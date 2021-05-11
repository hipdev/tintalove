import { useRouter } from 'next/router'
import Post from 'components/post/post'

const PostPage = () => {
  const router = useRouter()
  const { postId } = router.query

  return (
    <>
      {postId && <Post postId={postId} />}
      {!postId && <span> Este post no existe</span>}
    </>
  )
}

export default PostPage
