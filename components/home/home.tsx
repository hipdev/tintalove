import PostsList from './PostsList'

const Home = ({ posts }) => {
  return (
    <div>
      <PostsList posts={posts} />
    </div>
  )
}

export default Home
