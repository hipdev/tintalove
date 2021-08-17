import { useWindowSize } from 'hooks/useWindowSize'
import useSWR from 'swr'
import { getUserInfo } from 'lib/queries/users'
import PostsList from './PostsList'
import useUserId from 'hooks/use-user-id'

const Home = ({ posts }) => {
  const { userId } = useUserId()
  const size = useWindowSize()
  const { data } = useSWR(userId ? userId : null, getUserInfo)

  return size?.width ? (
    <PostsList posts={posts} size={size} user={data?.user} />
  ) : null
}

export default Home
