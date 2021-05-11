import IsAuth from 'components/isAuth'
import Layout from 'components/layout/layout'
import CreatePost from 'components/post/create-post'
import useUser from 'hooks/use-user'

export default function PostCreatePage() {
  const { state } = useUser()

  console.log(state, 'user')

  return (
    <>
      {state?.user?.is_artist ? (
        <Layout>
          {state && state.user && <CreatePost uid={state?.user?.uid || null} />}
        </Layout>
      ) : (
        <Layout>
          <IsAuth>No eres un artista :(</IsAuth>
        </Layout>
      )}
    </>
  )
}
