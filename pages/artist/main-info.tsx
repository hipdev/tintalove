import MainInfo from 'components/artist-account/main-info'
import MainInfoEdit from 'components/artist-account/main-info-edit/main-info-edit'
import IsAuth from 'components/isAuth'
import LayoutSteps from 'components/layout-steps/layout-steps'
import useUser from 'hooks/use-user'

export default function MainInfoPage() {
  const { state } = useUser()
  const isArtist = state?.user?.is_artist

  console.log(isArtist, 'es artista?')

  return (
    <>
      {state?.user ? (
        <LayoutSteps>
          <IsAuth>
            {isArtist ? (
              <MainInfoEdit uid={state?.user?.uid || null} />
            ) : (
              <MainInfo uid={state?.user?.uid || null} />
            )}
          </IsAuth>
        </LayoutSteps>
      ) : (
        <span>Cargando...</span>
      )}
    </>
  )
}
