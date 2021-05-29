import IsAuth from 'components/isAuth'
import LayoutStepsStudio from 'components/layout-steps/layout-steps-studio'
import Artists from 'components/studio-account/artists/artists'
import useUserId from 'hooks/use-user-id'
import { getUserInfo } from 'lib/queries/users'
import useSWR from 'swr'

export default function StudioArtists({ studioId }) {
  const { userId } = useUserId()
  const { data } = useSWR(userId ? userId : null, getUserInfo)

  if (!data && !data?.user) {
    return <IsAuth>Cargando data...</IsAuth>
  }

  return (
    <LayoutStepsStudio uid={userId} user={data.user}>
      <Artists
        uid={data.user.uid || null}
        hasStudio={data.user.has_studio}
        studioId={data.user.studio_id}
      />
    </LayoutStepsStudio>
  )
}
