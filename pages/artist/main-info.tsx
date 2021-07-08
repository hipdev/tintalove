import MainInfo from 'components/artist-account/main-info'
import MainInfoEdit from 'components/artist-account/main-info-edit/main-info-edit'
import IsAuth from 'components/isAuth'
import LayoutStepsArtist from 'components/layout-steps/layout-steps-artist'
import useUserId from 'hooks/use-user-id'
import { getUserInfo } from 'lib/queries/users'
import Script from 'next/script'
import useSWR from 'swr'

export default function MainInfoPage() {
  const { userId } = useUserId()
  const { data } = useSWR(userId ? userId : null, getUserInfo)

  if (!data && !data?.user) {
    return <IsAuth>Cargando data...</IsAuth>
  }
  return (
    <>
      <LayoutStepsArtist uid={userId} user={data.user}>
        <Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA5drETj_sJmO1kGEDEb7tXWzwJb05ipCY&libraries=places" />

        {data.user.is_artist ? (
          <MainInfoEdit uid={data.user.uid || null} />
        ) : (
          <MainInfo uid={data.user.uid || null} />
        )}
      </LayoutStepsArtist>
    </>
  )
}
