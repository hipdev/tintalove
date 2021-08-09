import { getArtistInfo, getArtistPictures } from 'lib/queries/artists'
import useSWR from 'swr'
import { AiOutlineCalendar } from 'react-icons/ai'
import Link from 'next/link'
import { getLastThreePostsByArtist } from 'lib/queries/posts'

const ArtistsCard = ({ artistId }: { artistId: string }) => {
  const { data } = useSWR(['getArtistInfo', artistId], getArtistInfo)
  const { data: artistPosts } = useSWR(
    ['getLastThreePostsByArtist', artistId],
    getLastThreePostsByArtist
  )

  console.log(artistPosts, 'las fotos')
  return (
    <div className="w-full h-full bg-gr-800 p-5 rounded-md">
      <div className="flex justify-between">
        <div className="flex flex-wrap gap-5">
          <Link href={`/${data?.artist?.username}`}>
            <a className="bg-black w-14 sm:w-16 h-14 sm:h-16 rounded-xl">
              <img
                className="object-cover rounded-md"
                src={`${data?.artist?.profile_picture?.url}/tr:pr-true,w-70,h-70,q-90`}
                alt=""
              />
            </a>
          </Link>

          <div>
            <Link href={`/${data?.artist?.username}`}>
              <a className="text-2xl font-semibold text-white tracking-wide capitalize">
                {data?.artist?.username}
              </a>
            </Link>
            <div className="flex gap-4 justify-between mt-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-green-500 text-xl">
                  <AiOutlineCalendar />
                </span>
                <p className="text-gray-400 text-sm">
                  Disponibilidad:{' '}
                  <span className="text-green-500">
                    {data?.artist?.available_label}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-gray-400 mb-2 mt-3 truncate text-sm">
        <span>Estilos: </span>
        {data?.artist?.styles ? (
          data.artist.styles.join(', ')
        ) : (
          <span>Ninguno registrado</span>
        )}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 ">
        {artistPosts?.posts?.map((post) => {
          return (
            <Link href={`/tatuajes/${post.id}`} key={post.id}>
              <a className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
                <img
                  src={`${post?.image?.url}/tr:pr-true,w-120,h-160,q-90`}
                  alt=""
                  className="h-32 w-full object-cover rounded-md"
                />
              </a>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default ArtistsCard
