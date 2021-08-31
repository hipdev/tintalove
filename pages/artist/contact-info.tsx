import useSWR from 'swr'
import ContactInfo from 'components/artist-account/contact-info/ContactInfo'
import IsAuth from 'components/isAuth'
import LayoutStepsArtist from 'components/layout-steps/LayoutStepsArtist'
import { useUser } from 'hooks/useUser'
import { getArtistFullInfo } from 'lib/queries/artists'

export default function ContactInfoPage() {
  const { user }: any = useUser()

  const { data: artist } = useSWR(
    user?.id ? ['getArtistFullInfo', user.id] : null,
    getArtistFullInfo
  )

  if (!user && !artist) {
    return <IsAuth>Cargando data...</IsAuth>
  }

  return (
    <LayoutStepsArtist uid={user.id} user={user}>
      <ContactInfo uid={user.id || null} artist={artist} />
    </LayoutStepsArtist>
  )
}
