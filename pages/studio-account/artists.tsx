import IsAuth from 'components/isAuth'
import LayoutStepsStudio from 'components/layout-steps/layout-steps-studio'
import Artists from 'components/studio-account/artists/artists'

import useUser from 'hooks/use-user'

export default function StudioArtists() {
  const { state } = useUser()
  const isArtist = state?.user?.is_artist

  return (
    <>
      {state?.user ? (
        <LayoutStepsStudio
          uid={state?.user?.uid}
          userState={state?.user || null}
        >
          {state && state.user && (
            <Artists uid={state?.user?.uid || null} isArtist={isArtist} />
          )}
        </LayoutStepsStudio>
      ) : (
        <LayoutStepsStudio>
          <IsAuth>Cargando...</IsAuth>
        </LayoutStepsStudio>
      )}
    </>
  )
}
