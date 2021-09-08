import LayoutStepsStudio from 'components/layout-steps/LayoutStepsStudio'
import IsAuth from 'components/isAuth'

import useUserId from 'hooks/use-user-id'
import useSWR from 'swr'
import { getUserInfo } from 'lib/queries/users'
import PhotosInfo from 'components/studio-account/photos/PhotosInfo'
import { useUser } from 'hooks/useUser'
import { getArtistInfo } from 'lib/queries/artists'

export default function PictureInfoPage() {
  const { user }: any = useUser()

  const { data: artist } = useSWR(
    user?.id ? ['getArtistFullInfo', user.id] : null,
    getArtistInfo
  )

  if (!user && !artist) {
    return <IsAuth>Cargando data...</IsAuth>
  }

  return (
    <LayoutStepsStudio uid={user.id} user={user}>
      <PhotosInfo hasStudio={user} studioId={user.id} />
    </LayoutStepsStudio>
  )
}
