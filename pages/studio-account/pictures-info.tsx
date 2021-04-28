import LayoutStepsStudio from 'components/layout-steps/layout-steps-studio'

import IsAuth from 'components/isAuth'
import useUser from 'hooks/use-user'
import PicturesInfoStudio from 'components/studio-account/pictures/pictures-info'

export default function PictureInfoPage() {
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
            <PicturesInfoStudio
              studioId={state?.user?.studioId || null}
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
