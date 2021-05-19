import PostsList from './posts-list'

const Home = ({ posts }) => {
  return (
    <div className="">
      <PostsList posts={posts} />
    </div>
  )
}

export default Home
