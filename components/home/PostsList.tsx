import PostsListDesktop from './PostsListDesktop'
import PostsListAllMobile from './PostsListAllMobile'

const PostListHome = ({ size, user }) => {
  if (size.width <= 500) {
    return <PostsListAllMobile user={user} />
  } else {
    return <PostsListDesktop user={user} />
  }
}

export default PostListHome
