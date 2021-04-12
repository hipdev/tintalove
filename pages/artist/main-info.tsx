import MainInfo from 'components/artist-account/main-info'
import MainInfoEdit from 'components/artist-account/main-info-edit/main-info-edit'
import IsAuth from 'components/isAuth'
import LayoutSteps from 'components/layout-steps/layout-steps'
import useUser from 'hooks/use-user'

export default function MainInfoPage() {
  const { state } = useUser()
  const isArtist = state?.user?.is_artist

  return (
    <>
      {state?.user ? (
        <LayoutSteps uid={state?.user?.uid}>
          {state && state.user && isArtist ? (
            <MainInfoEdit uid={state?.user?.uid || null} />
          ) : (
            <MainInfo uid={state?.user?.uid || null} />
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
