import PostsList from './PostsList'

const Home = ({ posts, size }) => {
  return size && <PostsList posts={posts} size={size} />
}

export default Home
