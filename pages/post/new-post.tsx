import Layout from 'components/layout/Layout'
import Loading from 'components/loading/loading'
import CreatePost from 'components/post/create/CreatePost'
import { useUser } from 'hooks/useUser'
import { getArtistFullInfo, getStudiosByUserId } from 'lib/queries/artists'

import useSWR from 'swr'

export default function PostCreatePage() {
  const { user }: any = useUser()

  console.log(user, 'el usuario')

  const { data: artist }: any = useSWR(
    user?.id ? ['getArtistFullInfo', user.id] : null,
    getArtistFullInfo
  )

  const { data: artistStudios } = useSWR(
    user?.id ? ['getStudiosByUserId', user.id] : null,
    getStudiosByUserId
  )

  if (!user && !artist) return <Loading />

  return (
    <Layout>
      {artist?.is_active ? (
        <CreatePost artist={artist} artistsStudios={artistStudios} />
      ) : (
        <div className="h-screen flex justify-center bg-gray-800">
          <p className="text-3xl text-gray-300 mt-20">
            Primero debes ser un artista activo
          </p>
        </div>
      )}
    </Layout>
  )
}
