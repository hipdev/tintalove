import Layout from 'components/layout/Layout'
import Loading from 'components/loading/loading'
import CreatePost from 'components/post/create/CreatePost'
import useUserId from 'hooks/use-user-id'
import { useUser } from 'hooks/useUser'
import { getArtistFullInfo } from 'lib/queries/artists'
import { getUserInfo } from 'lib/queries/users'
import { useState } from 'react'
import useSWR from 'swr'

export default function PostCreatePage() {
  const { user }: any = useUser()

  console.log(user, 'el usuario')

  const [loadMap, setLoadMap] = useState(false)

  const { data: artist } = useSWR(
    user?.id ? ['getArtistFullInfo', user.id] : null,
    getArtistFullInfo
  )

  if (!user && !artist) return <Loading />

  return (
    <Layout>
      {artist?.is_active ? (
        <CreatePost user={user} />
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
