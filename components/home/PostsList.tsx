import PostsListDesktop from './PostsListDesktop'
import PostsListAllMobile from './PostsListAllMobile'

const PostListHome = ({ size, user, latLng }) => {
  if (size.width <= 500) {
    return <PostsListAllMobile user={user} latLng={latLng} />
  } else {
    return <PostsListDesktop user={user} latLng={latLng} />
  }
}

export default PostListHome
