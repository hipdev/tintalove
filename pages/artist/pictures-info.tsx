import PicturesInfo from 'components/artist-account/pictures-info'

import IsAuth from 'components/isAuth'
import LayoutSteps from 'components/layout-steps/layout-steps'
import useUser from 'hooks/use-user'

export default function PictureInfoPage() {
  const { state } = useUser()
  const isArtist = state?.user?.is_artist

  return (
    <>
      {state?.user ? (
        <LayoutSteps uid={state?.user?.uid}>
          {state && state.user && (
            <PicturesInfo uid={state?.user?.uid || null} isArtist={isArtist} />
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
