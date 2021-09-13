import useSWR from 'swr'
import { useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import IsAuth from 'components/isAuth'
import LayoutStepsStudio from 'components/layout-steps/LayoutStepsStudio'
import ContactInfoStudio from 'components/studio-account/contact-info/ContactInfo'
import { useUser } from 'hooks/useUser'
import { getStudioData } from 'lib/queries/studios'

const loader = new Loader({
  apiKey: 'AIzaSyA5drETj_sJmO1kGEDEb7tXWzwJb05ipCY', // api key de google maps
  libraries: ['places'],
})

export default function ContactInfoPageStudio() {
  const { user }: any = useUser()

  const { data: dataStudio } = useSWR(
    user?.id ? ['getStudioData', user.id] : null,
    getStudioData
  )

  const [loadMap, setLoadMap] = useState(false)

  loader
    .load()
    .then(() => {
      setLoadMap(true)
    })
    .catch((e) => {
      console.log('error loading Google Maps API')
    })

  if (!user && !dataStudio) {
    return <IsAuth>Cargando data...</IsAuth>
  }

  return (
    <LayoutStepsStudio uid={user.id} user={user}>
      {loadMap && (
        <ContactInfoStudio
          studioData={dataStudio?.studios}
          studioId={dataStudio?.studio_id}
        />
      )}
    </LayoutStepsStudio>
  )
}
