import PostMore from 'components/post/PostMore'
import { getArtistPosts } from 'lib/queries/posts'
import Link from 'next/link'
import Masonry from 'react-masonry-css'
import useSWR from 'swr'
import { UserState } from 'types/user'

type Props = {
  artistId: any
  user: UserState
}

const loaderPost = ({ src, quality }: any) => {
  return `${src}/tr:pr-true,c-at_max,f-auto,h-320,q-${quality || 75}`
}

const breakpointColumnsObj = {
  default: 6,
  1600: 4,
  1100: 3,
  700: 2,
  500: 1,
}

const ArtistsPosts = ({ artistId, user }: Props) => {
  console.log(artistId, 'artist id')
  const { data } = useSWR(['get-artist-posts', artistId], getArtistPosts)

  console.log(data, 'los posts')

  return (
    <div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {data?.posts?.map((post) => (
          <PostMore post={post} user={user} key={post.id} />
        ))}
        {data?.posts?.map((post) => (
          <PostMore post={post} user={user} key={post.id} />
        ))}
        {data?.posts?.map((post) => (
          <PostMore post={post} user={user} key={post.id} />
        ))}
      </Masonry>

      {data?.posts?.length == 0 && (
        <div className="text-center text-3xl text-gray-300 font-bold mt-12">
          <h2>Sin publicaciones actualmente</h2>
        </div>
      )}
    </div>
  )
}

export default ArtistsPosts
