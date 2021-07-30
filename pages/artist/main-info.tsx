import MainInfo from 'components/artist-account/MainInfo'
import MainInfoEdit from 'components/artist-account/main-info-edit/MainInfoEdit'
import IsAuth from 'components/isAuth'
import LayoutStepsArtist from 'components/layout-steps/LayoutStepsArtist'
import useUserId from 'hooks/use-user-id'
import { getUserInfo } from 'lib/queries/users'
import Script from 'next/script'
import useSWR from 'swr'
import { useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

const loader = new Loader({
  apiKey: 'AIzaSyA5drETj_sJmO1kGEDEb7tXWzwJb05ipCY', // api key de google maps
  libraries: ['places'],
})

export default function MainInfoPage() {
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
    <>
      <LayoutStepsArtist uid={userId} user={data.user}>
        {loadMap && (
          <>
            {data.user.is_artist ? (
              <MainInfoEdit uid={data.user.uid || null} />
            ) : (
              <MainInfo uid={data.user.uid || null} />
            )}
          </>
        )}
      </LayoutStepsArtist>
    </>
  )
}
