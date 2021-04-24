import GeneralInfo from 'components/studio-account/general-info'
import GeneralInfoEdit from 'components/studio-account/general-info-edit/general-info-edit'
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
            <GeneralInfoEdit uid={state?.user?.uid || null} />
          ) : (
            <GeneralInfo uid={state?.user?.uid || null} />
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
