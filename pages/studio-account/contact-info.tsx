import useSWR from 'swr'
import { useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import IsAuth from 'components/isAuth'
import LayoutStepsStudio from 'components/layout-steps/LayoutStepsStudio'
import ContactInfoStudio from 'components/studio-account/contact-info/ContactInfo'
import { getArtistInfo } from 'lib/queries/artists'
import { useUser } from 'hooks/useUser'

const loader = new Loader({
  apiKey: 'AIzaSyA5drETj_sJmO1kGEDEb7tXWzwJb05ipCY', // api key de google maps
  libraries: ['places'],
})

export default function ContactInfoPageStudio() {
  const { user }: any = useUser()

  const { data: artist } = useSWR(
    user?.id ? ['getArtistFullInfo', user.id] : null,
    getArtistInfo
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

  if (!user && !artist) {
    return <IsAuth>Cargando data...</IsAuth>
  }

  return (
    <LayoutStepsStudio uid={user.id} user={user}>
      {loadMap && <ContactInfoStudio hasStudio={user} studioId={user.id} />}
    </LayoutStepsStudio>
  )
}
