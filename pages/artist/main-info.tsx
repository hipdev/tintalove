import MainInfo from 'components/artist-account/main-info'
import MainInfoEdit from 'components/artist-account/main-info-edit/main-info-edit'
import IsAuth from 'components/isAuth'
import LayoutStepsArtist from 'components/layout-steps/layout-steps-artist'
import useUserId from 'hooks/use-user-id'
import { getUserInfo } from 'lib/queries/users'
import useSWR from 'swr'

export default function MainInfoPage() {
  const { userId } = useUserId()

  const { data, error } = useSWR(userId ? userId : null, getUserInfo)

  console.log(data, 'data en main-info')

  if (!data) {
    return (
      <LayoutStepsArtist>
        <IsAuth>Cargando data...</IsAuth>
      </LayoutStepsArtist>
    )
  }
  return (
    <>
      <LayoutStepsArtist uid={userId} userState={data?.user || null}>
        {data.user.is_artist ? (
          <MainInfoEdit uid={data.user.uid || null} />
        ) : (
          <MainInfo uid={data.user.uid || null} />
        )}
      </LayoutStepsArtist>
    </>
  )
}
