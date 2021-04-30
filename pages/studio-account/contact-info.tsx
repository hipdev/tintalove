import IsAuth from 'components/isAuth'
import LayoutStepsStudio from 'components/layout-steps/layout-steps-studio'
import ContactInfoStudio from 'components/studio-account/contact-info/contact-info'
import useScript from 'hooks/use-script'

import useUser from 'hooks/use-user'

const libraries = 'places'

export default function ContactInfoPageStudio() {
  const { state } = useUser()
  const hasStudio = state?.user?.has_studio

  const status = useScript(
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyA5drETj_sJmO1kGEDEb7tXWzwJb05ipCY&libraries=places'
  )

  console.log(status, 'status del map')

  return (
    <>
      {state?.user ? (
        <LayoutStepsStudio
          uid={state?.user?.uid}
          userState={state?.user || null}
        >
          {state && state.user && (
            <div>
              {status === 'ready' && (
                <ContactInfoStudio
                  studioId={state?.user?.studio_id || null}
                  hasStudio={hasStudio}
                />
              )}
            </div>
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
