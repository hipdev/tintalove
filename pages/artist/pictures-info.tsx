import PicturesInfo from 'components/artist-account/photos/pictures-info'

import IsAuth from 'components/isAuth'
import LayoutStepsArtist from 'components/layout-steps/layout-steps-artist'
import useUser from 'hooks/use-user'
import useUserId from 'hooks/use-user-id'
import { getUserInfo } from 'lib/queries/users'
import useSWR from 'swr'

export default function PictureInfoPage() {
  const { userId } = useUserId()
  const { data } = useSWR(userId ? userId : null, getUserInfo)

  if (!data && !data?.user) {
    return <IsAuth>Cargando data...</IsAuth>
  }

  return (
    <LayoutStepsArtist uid={userId} user={data.user}>
      <PicturesInfo
        uid={data.user.uid || null}
        isArtist={data.user.is_artist}
      />
    </LayoutStepsArtist>
  )
}
