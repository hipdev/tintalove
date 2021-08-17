import { useWindowSize } from 'hooks/useWindowSize'
import PostsList from './PostsList'

const Home = ({ posts }) => {
  const size = useWindowSize()
  return size?.width ? <PostsList posts={posts} size={size} /> : null
}

export default Home
