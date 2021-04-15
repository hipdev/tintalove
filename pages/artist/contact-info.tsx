import ContactInfo from 'components/artist-account/contact-info'
import IsAuth from 'components/isAuth'
import LayoutSteps from 'components/layout-steps/layout-steps'
import Layout from 'components/layout/layout'
import useUser from 'hooks/use-user'

export default function ContactInfoPage() {
  const { state } = useUser()
  const isArtist = state?.user?.is_artist

  return (
    <>
      {state?.user ? (
        <LayoutSteps uid={state?.user?.uid}>
          {state && state.user && (
            <ContactInfo uid={state?.user?.uid || null} isArtist={isArtist} />
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
