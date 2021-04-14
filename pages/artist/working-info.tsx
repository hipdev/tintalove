import WorkingInfo from 'components/artist-account/working-info'
import IsAuth from 'components/isAuth'
import LayoutSteps from 'components/layout-steps/layout-steps'
import useArtist from 'hooks/use-artist'

import useUser from 'hooks/use-user'

export default function WorkingInfopage() {
  const { state } = useUser()
  const isArtist = state?.user?.is_artist

  return (
    <>
      {state?.user ? (
        <LayoutSteps uid={state?.user?.uid}>
          {state && state.user && (
            <WorkingInfo uid={state?.user?.uid || null} isArtist={isArtist} />
          )}
        </LayoutSteps>
      ) : (
        <LayoutSteps>
          <IsAuth>Cargando...</IsAuth>
        </LayoutSteps>
      )}
    </>
  )
}
