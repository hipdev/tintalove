import useSWR from 'swr'
import { AiOutlineCalendar } from 'react-icons/ai'
import Link from 'next/link'
import { getLastFourPostsByArtist } from 'lib/queries/posts'
import { ArtistTypes } from 'types/artist'
import { agenda } from 'components/layout/header/availability'

const ArtistsCard = ({ artist }: { artist: ArtistTypes }) => {
  const { data: artistPosts } = useSWR(
    ['getLastFourPostsByArtist', artist.id],
    getLastFourPostsByArtist
  )

  console.log(artist, artistPosts, 'esto que ome')

  return (
    <div className="w-full h-full bg-gr-800 p-5 rounded-md">
      <div className="flex justify-between">
        <div className="flex  gap-5">
          <Link href={`/${artist?.username}`}>
            <a className="bg-transparent w-24 sm:w-16 h-14 sm:h-16 rounded-xl">
              <img
                className="object-cover rounded-md"
                src={`${artist?.artists_main_photos?.url}/tr:pr-true,w-70,h-70,q-90`}
                alt=""
              />
            </a>
          </Link>

          <div>
            <Link href={`/${artist?.username}`}>
              <a className="text-xl font-semibold text-white tracking-wide capitalize">
                {artist?.username}
              </a>
            </Link>
            <div className="flex gap-4 justify-between mt-1">
              <div className="flex items-center gap-3 mb-2">
                <p className="text-gray-400 text-sm">
                  Disponibilidad:{' '}
                  <span className="text-green-500">
                    {artist?.availability_id &&
                      agenda[artist.availability_id - 1].label}
                  </span>
                </p>
                <span className="text-green-500 text-xl">
                  <AiOutlineCalendar />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-gray-400 mb-2 mt-3 truncate text-sm">
        <span>Estilos: </span>
        {artist?.styles ? (
          artist.styles.join(', ')
        ) : (
          <span>Ninguno registrado</span>
        )}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 ">
        {artistPosts?.map((post) => {
          return (
            <Link href={`/tatuajes/${post.id}`} key={post.id}>
              <a className="bg-transparent w-full rounded-md overflow-hidden group relative">
                <div
                  style={{
                    boxShadow: 'rgb(0 0 0 / 87%) 0px 2px 92px 0px inset',
                  }}
                  className="absolute w-full h-full group-hover:z-10"
                />
                <img
                  src={`${post?.photo_info?.url}/tr:pr-true,w-220,h-190,q-90`}
                  alt=""
                  className="h-44 w-full object-cover rounded-md relative"
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
