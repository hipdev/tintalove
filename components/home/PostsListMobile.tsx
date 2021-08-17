import Loading from 'components/loading/loading'
import { getPostsByCity } from 'lib/queries/geo'
import { getPostsInfoMobile } from 'lib/queries/posts'
import useSWR from 'swr'
import PostItem from './PostItem'

const PostsListMobile = ({ user, latLng }) => {
  const { data } = useSWR(
    latLng ? ['getPostsByCity', latLng] : ['getPostsInfoMobile'],
    latLng ? getPostsByCity : getPostsInfoMobile
  )

  if (!data) return <Loading />

  return (
    <div className="px-5 sm:px-10 lg:px-20 pt-7 md:pt-24 pb-14">
      {data.posts.length > 0 ? (
        data.posts.map((post) => (
          <PostItem key={Math.random()} post={post} user={user} />
        ))
      ) : (
        <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
      )}
    </div>
  )
}

export default PostsListMobile
