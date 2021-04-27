import IsAuth from 'components/isAuth'
import LayoutStepsStudio from 'components/layout-steps/layout-steps-studio'
import Artists from 'components/studio-account/artists/artists'
import useStudio from 'hooks/use-studio'

import useUser from 'hooks/use-user'
import { UserState } from 'types/user'

export default function StudioArtists({ studioId }) {
  const { state }: { state: { user: UserState } } = useUser()

  const isArtist = state?.user?.is_artist

  return (
    <>
      {state?.user ? (
        <LayoutStepsStudio
          uid={state?.user?.uid}
          userState={state?.user || null}
        >
          {state && state.user && (
            <Artists
              uid={state?.user?.uid || null}
              hasStudio={state?.user?.has_studio}
              studioId={state?.user?.studio_id}
            />
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
