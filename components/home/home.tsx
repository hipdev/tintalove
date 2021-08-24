import { useWindowSize } from 'hooks/useWindowSize'
import PostsList from './PostsList'
import { useUser } from 'hooks/useUser'

const Home = ({ latLng }: { latLng?: any }) => {
  const { user }: any = useUser()
  const size = useWindowSize()

  return size?.width ? (
    <PostsList size={size} user={user} latLng={latLng} />
  ) : null
}

export default Home
