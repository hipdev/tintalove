import PostsListDesktop from './PostsListDesktop'
import PostsListMobile from './PostsListMobile'

const PostListHome = ({ size, user }) => {
  if (size.width <= 500) {
    return <PostsListMobile user={user} />
  } else {
    return <PostsListDesktop user={user} />
  }
}

export default PostListHome
