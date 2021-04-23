import ContactInfo from 'components/artist-account/contact-info'
import IsAuth from 'components/isAuth'
import LayoutStepsArtist from 'components/layout-steps/layout-steps-artist'

import useUser from 'hooks/use-user'

export default function ContactInfoPage() {
  const { state } = useUser()
  const isArtist = state?.user?.is_artist

  return (
    <>
      {state?.user ? (
        <LayoutStepsArtist
          uid={state?.user?.uid}
          userState={state?.user || null}
        >
          {state && state.user && (
            <ContactInfo uid={state?.user?.uid || null} isArtist={isArtist} />
          )}
        </LayoutStepsArtist>
      ) : (
        <LayoutStepsArtist>
          <IsAuth>Cargando...</IsAuth>
        </LayoutStepsArtist>
      )}
    </>
  )
}
