import IsAuth from 'components/isAuth'
import LayoutSteps from 'components/layout-steps/layout-steps'
import useUser from 'hooks/use-user'
import dynamic from 'next/dynamic'

const MainInfoNoSSR = dynamic(
  () => import('components/artist-account/main-info'),
  { ssr: false }
)
const MainInfoEditNoSSR = dynamic(
  () => import('components/artist-account//main-info-edit/main-info-edit'),
  { ssr: false }
)

export default function MainInfoPage() {
  const { state } = useUser()
  const isArtist = state?.user?.is_artist

  return (
    <>
      {state?.user ? (
        <LayoutSteps uid={state?.user?.uid}>
          {state && state.user && isArtist ? (
            <MainInfoEditNoSSR uid={state?.user?.uid || null} />
          ) : (
            <MainInfoNoSSR uid={state?.user?.uid || null} />
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
