import PostsList from './posts-list'

const Home = ({ posts }) => {
  return (
    <div>
      <PostsList posts={posts} />
    </div>
  )
}

export default Home
