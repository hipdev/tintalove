import PhotosInfo from 'components/artist-account/photos/PhotosInfo'

import IsAuth from 'components/isAuth'
import LayoutStepsArtist from 'components/layout-steps/LayoutStepsArtist'
import useUser from 'hooks/use-user'
import useUserId from 'hooks/use-user-id'
import { getUserInfo } from 'lib/queries/users'
import useSWR from 'swr'

export default function PhotosInfoPage() {
  const { userId } = useUserId()
  const { data } = useSWR(userId ? userId : null, getUserInfo)

  if (!data && !data?.user) {
    return <IsAuth>Cargando data...</IsAuth>
  }

  return (
    <LayoutStepsArtist uid={userId} user={data.user}>
      <PhotosInfo uid={data.user.uid || null} isArtist={data.user.is_artist} />
    </LayoutStepsArtist>
  )
}
