import PostMore from 'components/post/PostMore'
import { getArtistPosts } from 'lib/queries/posts'
import Masonry from 'react-masonry-css'
import useSWR from 'swr'
import { UserState } from 'types/user'

type Props = {
  artistId: any
  user: UserState
}

const breakpointColumnsObj = {
  default: 5,
  1600: 4,
  1100: 3,
  700: 2,
  500: 1,
}

const ArtistsPosts = ({ artistId, user }: Props) => {
  const { data: posts } = useSWR(['getArtistPosts', artistId], getArtistPosts)

  return (
    <div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {posts?.map((post) => (
          <PostMore post={post} user={user} key={post.id} />
        ))}
        {posts?.map((post) => (
          <PostMore post={post} user={user} key={post.id} />
        ))}
      </Masonry>

      {posts?.length == 0 && (
        <div className="text-center text-3xl text-gray-300 font-bold mt-12">
          <h2>Sin publicaciones actualmente</h2>
        </div>
      )}
    </div>
  )
}

export default ArtistsPosts
