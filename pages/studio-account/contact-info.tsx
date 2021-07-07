import Script from 'next/script'
import IsAuth from 'components/isAuth'
import LayoutStepsStudio from 'components/layout-steps/layout-steps-studio'
import ContactInfoStudio from 'components/studio-account/contact-info/contact-info'
import useScript from 'hooks/use-script'

import useUserId from 'hooks/use-user-id'
import { getUserInfo } from 'lib/queries/users'
import useSWR from 'swr'

export default function ContactInfoPageStudio() {
  const { userId } = useUserId()
  const { data } = useSWR(userId ? userId : null, getUserInfo)

  const status = useScript(
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyA5drETj_sJmO1kGEDEb7tXWzwJb05ipCY&libraries=places'
  )

  if (!data && !data?.user) {
    return <IsAuth>Cargando data...</IsAuth>
  }

  return (
    <LayoutStepsStudio uid={userId} user={data.user}>
      <Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA5drETj_sJmO1kGEDEb7tXWzwJb05ipCY&libraries=places" />

      <ContactInfoStudio
        hasStudio={data.user.has_studio}
        studioId={data.user.studio_id}
      />
    </LayoutStepsStudio>
  )
}
