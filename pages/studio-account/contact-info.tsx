import IsAuth from 'components/isAuth'
import LayoutStepsStudio from 'components/layout-steps/layout-steps-studio'
import ContactInfoStudio from 'components/studio-account/contact-info/contact-info'

import useUser from 'hooks/use-user'

export default function ContactInfoPageStudio() {
  const { state } = useUser()
  const hasStudio = state?.user?.has_studio

  return (
    <>
      {state?.user ? (
        <LayoutStepsStudio
          uid={state?.user?.uid}
          userState={state?.user || null}
        >
          {state && state.user && (
            <ContactInfoStudio
              studioId={state?.user?.studio_id || null}
              hasStudio={hasStudio}
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
