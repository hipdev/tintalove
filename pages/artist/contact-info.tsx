import ContactInfo from 'components/artist-account/contact-info'
import IsAuth from 'components/isAuth'
import LayoutStepsArtist from 'components/layout-steps/layout-steps-artist'
import useUserId from 'hooks/use-user-id'
import { getUserInfo } from 'lib/queries/users'
import useSWR from 'swr'

export default function ContactInfoPage() {
  const { userId } = useUserId()
  const { data } = useSWR(userId ? userId : null, getUserInfo)

  if (!data && !data?.user) {
    return <IsAuth>Cargando data...</IsAuth>
  }

  return (
    <LayoutStepsArtist uid={userId} user={data.user}>
      <ContactInfo uid={data.user.uid || null} isArtist={data.user.is_artist} />
    </LayoutStepsArtist>
  )
}
