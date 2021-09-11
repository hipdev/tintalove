import IsAuth from 'components/isAuth'
import LayoutStepsStudio from 'components/layout-steps/LayoutStepsStudio'
import StudioArtists from 'components/studio-account/artists/StudioArtists'
import { useUser } from 'hooks/useUser'
import { getStudioData } from 'lib/queries/studios'
import useSWR from 'swr'

export default function ArtistsPage({ studioId }) {
  const { user }: any = useUser()

  const { data: dataStudio } = useSWR(
    user?.id ? ['getStudioData', user.id] : null,
    getStudioData
  )

  if (!user && !dataStudio) {
    return <IsAuth>Cargando data...</IsAuth>
  }

  return (
    <LayoutStepsStudio uid={user.id} user={user}>
      <StudioArtists
        uid={user.id || null}
        studioData={dataStudio?.studios}
        studioId={dataStudio?.studio_id} // falta agregar id del estudio aqui
      />
    </LayoutStepsStudio>
  )
}
