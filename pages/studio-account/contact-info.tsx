import useSWR from 'swr'
import { useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

import IsAuth from 'components/isAuth'
import LayoutStepsStudio from 'components/layout-steps/LayoutStepsStudio'
import ContactInfoStudio from 'components/studio-account/contact-info/ContactInfo'

import useUserId from 'hooks/use-user-id'
import { getUserInfo } from 'lib/queries/users'

const loader = new Loader({
  apiKey: 'AIzaSyA5drETj_sJmO1kGEDEb7tXWzwJb05ipCY', // api key de google maps
  libraries: ['places'],
})

export default function ContactInfoPageStudio() {
  const { userId } = useUserId()
  const { data } = useSWR(userId ? userId : null, getUserInfo)
  const [loadMap, setLoadMap] = useState(false)

  loader
    .load()
    .then(() => {
      setLoadMap(true)
    })
    .catch((e) => {
      console.log('error loading Google Maps API')
    })

  if (!data && !data?.user) {
    return <IsAuth>Cargando data...</IsAuth>
  }

  return (
    <LayoutStepsStudio uid={userId} user={data.user}>
      {loadMap && (
        <ContactInfoStudio
          hasStudio={data.user.has_studio}
          studioId={data.user.studio_id}
        />
      )}
    </LayoutStepsStudio>
  )
}
