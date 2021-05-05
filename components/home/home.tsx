import PostsList from './post-list'

const Home = ({ posts }) => {
  return (
    <div className="">
      <PostsList posts={posts} />
    </div>
  )
}

export default Home
