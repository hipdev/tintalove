import { Loader } from '@googlemaps/js-api-loader'
import { useState } from 'react'
import GeneralInfo from 'components/studio-account/GeneralInfo'
import GeneralInfoEdit from 'components/studio-account/general-info-edit/GeneralInfoEdit'
import IsAuth from 'components/isAuth'
import LayoutStepsStudio from 'components/layout-steps/LayoutStepsStudio'
import { useUser } from 'hooks/useUser'
import useSWR from 'swr'
import { getStudioId } from 'lib/queries/studios'

const loader = new Loader({
  apiKey: 'AIzaSyA5drETj_sJmO1kGEDEb7tXWzwJb05ipCY', // api key de google maps
  libraries: ['places'],
})

export default function MainInfoPage() {
  const { user }: any = useUser()

  const { data: studioId } = useSWR(
    user?.id ? ['getStudioId', user.id] : null,
    getStudioId
  )

  console.log(user, studioId, 'el user')

  const [loadMap, setLoadMap] = useState(false)

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
    <LayoutStepsStudio uid={user.id} user={user}>
      {loadMap && (
        <>
          {studioId ? (
            <GeneralInfoEdit
              studioId={studioId || null}
              uid={user.id || null}
            />
          ) : (
            <GeneralInfo uid={user.id || null} />
          )}
        </>
      )}
    </LayoutStepsStudio>
  )
}
