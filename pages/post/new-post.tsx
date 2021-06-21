import Layout from 'components/layout/layout'
import Loading from 'components/loading/loading'
import CreatePost from 'components/post/create/create-post'
import useUserId from 'hooks/use-user-id'
import { getUserInfo } from 'lib/queries/users'
import useSWR from 'swr'

export default function PostCreatePage() {
  const { userId } = useUserId()
  const { data } = useSWR(userId ? userId : null, getUserInfo)

  if (!data) return <Loading />

  return (
    <Layout>
      {data?.user.artist_active ? (
        <CreatePost user={data?.user} />
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
