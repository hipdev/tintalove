import IsAuth from 'components/isAuth'
import LayoutStepsStudio from 'components/layout-steps/LayoutStepsStudio'
import StudioArtists from 'components/studio-account/artists/StudioArtists'
import { useUser } from 'hooks/useUser'
import { getArtistInfo } from 'lib/queries/artists'
import useSWR from 'swr'

export default function ArtistsPage({ studioId }) {
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
      <StudioArtists
        uid={user.id || null}
        hasStudio={user}
        studioId={user.id} // falta agregar id del estudio aqui
      />
    </LayoutStepsStudio>
  )
}
