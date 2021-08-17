import PostsListDesktop from './PostsListDesktop'
import PostsListMobile from './PostsListMobile'

const PostListHome = ({ size, user, latLng }) => {
  if (size.width <= 500) {
    return <PostsListMobile user={user} latLng={latLng} />
  } else {
    return <PostsListDesktop user={user} latLng={latLng} />
  }
}

export default PostListHome
