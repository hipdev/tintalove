import GeneralInfo from 'components/studio-account/general-info'
import GeneralInfoEdit from 'components/studio-account/general-info-edit/general-info-edit'
import IsAuth from 'components/isAuth'
import LayoutStepsStudio from 'components/layout-steps/layout-steps-studio'
import useUser from 'hooks/use-user'
import useScript from 'hooks/use-script'

export default function MainInfoPage() {
  const { state } = useUser()
  const hasStudio = state?.user?.has_studio

  const status = useScript(
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyA5drETj_sJmO1kGEDEb7tXWzwJb05ipCY&libraries=places'
  )

  return (
    <>
      {state?.user ? (
        <LayoutStepsStudio
          uid={state?.user?.uid}
          userState={state?.user || null}
        >
          {state && state.user && hasStudio ? (
            <div>
              {status === 'ready' && (
                <GeneralInfoEdit
                  studioId={state?.user?.studio_id || null}
                  uid={state?.user?.uid || null}
                />
              )}
            </div>
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
