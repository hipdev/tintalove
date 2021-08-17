import { useWindowSize } from 'hooks/useWindowSize'
import PostsList from './PostsList'

const Home = ({ posts }) => {
  const size = useWindowSize()
  return size && <PostsList posts={posts} size={size} />
}

export default Home
