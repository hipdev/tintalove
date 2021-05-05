import PostsList from './post-list'

const Home = ({ posts }) => {
  return (
    <div className="container mx-auto">
      <PostsList posts={posts} />
    </div>
  )
}

export default Home
