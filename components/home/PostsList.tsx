import PostsListDesktop from './PostsListDesktop'
import PostsListMobile from './PostsListMobile'

const PostListHome = ({ posts, size, user }) => {
  if (size.width <= 500) {
    return <PostsListMobile posts={posts} user={user} />
  } else {
    return <PostsListDesktop posts={posts} user={user} />
  }
}

export default PostListHome
