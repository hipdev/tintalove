import MainInfo from 'components/artist-account/MainInfo'
import MainInfoEdit from 'components/artist-account/main-info-edit/MainInfoEdit'
import IsAuth from 'components/isAuth'
import LayoutStepsArtist from 'components/layout-steps/LayoutStepsArtist'
import { useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { useUser } from 'hooks/useUser'
import useSWR from 'swr'
import { getArtistInfo } from 'lib/queries/artists'

const loader = new Loader({
  apiKey: 'AIzaSyA5drETj_sJmO1kGEDEb7tXWzwJb05ipCY', // api key de google maps
  libraries: ['places'],
})

export default function MainInfoPage() {
  const { user }: any = useUser()

  const [loadMap, setLoadMap] = useState(false)

  const { data: artist } = useSWR(
    user?.id ? ['getArtistInfo', user.id] : null,
    getArtistInfo
  )

  loader
    .load()
    .then(() => {
      setLoadMap(true)
    })
    .catch((e) => {
      console.log('error loading Google Maps API')
    })

  if (!user) {
    return <IsAuth>Cargando data...</IsAuth>
  }
  return (
    <>
      <LayoutStepsArtist uid={user.id} user={user}>
        {loadMap && (
          <>
            {artist ? (
              <MainInfoEdit artist={artist} uid={user.id || null} />
            ) : (
              <MainInfo uid={user.id || null} email={user.email || null} />
            )}
          </>
        )}
      </LayoutStepsArtist>
    </>
  )
}
