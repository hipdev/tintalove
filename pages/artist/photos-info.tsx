import PhotosInfo from 'components/artist-account/photos/PhotosInfo'
import IsAuth from 'components/isAuth'
import LayoutStepsArtist from 'components/layout-steps/LayoutStepsArtist'
import { useUser } from 'hooks/useUser'
import { getArtistFullInfo } from 'lib/queries/artists'

import useSWR from 'swr'

export default function PhotosInfoPage() {
  const { user }: any = useUser()

  const { data: artist } = useSWR(
    user?.id ? ['getArtistFullInfo', user.id] : null,
    getArtistFullInfo
  )

  if (!user && !artist) {
    return <IsAuth>Cargando data...</IsAuth>
  }

  return (
    <LayoutStepsArtist uid={user.id} user={user}>
      <PhotosInfo uid={user.id || null} artist={artist} />
    </LayoutStepsArtist>
  )
}
