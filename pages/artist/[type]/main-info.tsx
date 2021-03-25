import MainInfo from 'components/artist-account/main-info'
import MainInfoEdit from 'components/artist-account/edit/main-info-edit'
import IsAuth from 'components/isAuth'
import Layout from 'components/layout/layout'
import useUser from 'hooks/use-user'

export default function MainInfoPage() {
  const { state } = useUser()
  const isArtist = state?.user?.is_artist

  console.log(isArtist, state, 'es artista')

  return (
    <Layout>
      <IsAuth>
        {isArtist ? (
          <MainInfoEdit uid={state && state?.user?.uid} />
        ) : (
          <MainInfo uid={state && state?.user?.uid} />
        )}
      </IsAuth>
    </Layout>
  )
}
