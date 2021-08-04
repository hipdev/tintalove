import { useState } from 'react'
import useSWR from 'swr'
import { Loader } from '@googlemaps/js-api-loader'
import WorkingInfo from 'components/artist-account/working-info/WorkingInfo'
import IsAuth from 'components/isAuth'
import LayoutStepsArtist from 'components/layout-steps/LayoutStepsArtist'
import useUserId from 'hooks/use-user-id'
import { getUserInfo } from 'lib/queries/users'

const loader = new Loader({
  apiKey: 'AIzaSyA5drETj_sJmO1kGEDEb7tXWzwJb05ipCY', // api key de google maps
  libraries: ['places'],
})

export default function WorkingInfopage() {
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
    <LayoutStepsArtist uid={userId} user={data.user}>
      {loadMap && (
        <WorkingInfo
          uid={data.user.uid || null}
          isArtist={data.user.is_artist}
        />
      )}
    </LayoutStepsArtist>
  )
}
