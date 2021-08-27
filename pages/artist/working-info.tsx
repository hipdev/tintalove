import { useState } from 'react'
import useSWR from 'swr'
import { Loader } from '@googlemaps/js-api-loader'
import WorkingInfo from 'components/artist-account/working-info/WorkingInfo'
import IsAuth from 'components/isAuth'
import LayoutStepsArtist from 'components/layout-steps/LayoutStepsArtist'
import useUserId from 'hooks/use-user-id'
import { getUserInfo } from 'lib/queries/users'
import { useUser } from 'hooks/useUser'
import { getArtistFullInfo } from 'lib/queries/artists'

const loader = new Loader({
  apiKey: 'AIzaSyA5drETj_sJmO1kGEDEb7tXWzwJb05ipCY', // api key de google maps
  libraries: ['places'],
})

export default function WorkingInfopage() {
  const { user }: any = useUser()

  const { data: artist } = useSWR(
    user?.id ? ['getArtistFullInfo', user.id] : null,
    getArtistFullInfo
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
    <LayoutStepsArtist uid={user?.id} user={user}>
      {loadMap && (
        <WorkingInfo
          uid={user?.id || null}
          artist={artist}
          isArtist={artist || false}
        />
      )}
    </LayoutStepsArtist>
  )
}
