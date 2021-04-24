import MainInfo from 'components/artist-account/main-info'
import MainInfoEdit from 'components/artist-account/main-info-edit/main-info-edit'
import IsAuth from 'components/isAuth'
import LayoutStepsStudio from 'components/layout-steps/layout-steps-studio'
import useUser from 'hooks/use-user'

export default function MainInfoPage() {
  const { state } = useUser()
  const isStudio = state?.user?.is_studio

  return (
    <>
      {state?.user ? (
        <LayoutStepsStudio
          uid={state?.user?.uid}
          userState={state?.user || null}
        >
          {state && state.user && isStudio ? (
            <MainInfoEdit uid={state?.user?.uid || null} />
          ) : (
            <MainInfo uid={state?.user?.uid || null} />
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
