import WorkingInfo from 'components/artist-account/working-info'
import IsAuth from 'components/isAuth'
import Layout from 'components/layout/layout'
import useUser from 'hooks/use-user'

export default function WorkingInfopage() {
  const { state } = useUser()
  const isArtist = state?.user?.is_artist

  return (
    <Layout>
      <IsAuth>
        <WorkingInfo isArtist={isArtist} />
      </IsAuth>
    </Layout>
  )
}
