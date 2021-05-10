import usePost from 'hooks/use-post'
import PostProfile from './post-profile'

const Post = ({ postId }) => {
  console.log(postId, 'el id del post')
  const { post } = usePost(postId)

  console.log(post, 'data post')

  if (!post) return <span>Cargando info...</span>

  return <>{post?.id && <PostProfile post={post} />}</>
}

export default Post
