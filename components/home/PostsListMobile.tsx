import PostItem from './PostItem'

const PostsListMobile = ({ posts, user }) => {
  return (
    <div className="px-5 sm:px-10 lg:px-20 pt-7 md:pt-24">
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostItem key={Math.random()} post={post} user={user} />
        ))
      ) : (
        <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
      )}
    </div>
  )
}

export default PostsListMobile
