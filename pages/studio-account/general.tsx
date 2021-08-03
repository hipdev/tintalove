import { Loader } from '@googlemaps/js-api-loader'
import { useState } from 'react'
import GeneralInfo from 'components/studio-account/GeneralInfo'
import GeneralInfoEdit from 'components/studio-account/general-info-edit/GeneralInfoEdit'
import IsAuth from 'components/isAuth'
import LayoutStepsStudio from 'components/layout-steps/LayoutStepsStudio'
import useUserId from 'hooks/use-user-id'
import useSWR from 'swr'
import { getUserInfo } from 'lib/queries/users'

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
    <LayoutStepsStudio uid={userId} user={data.user}>
      {loadMap && (
        <>
          {data.user.has_studio ? (
            <GeneralInfoEdit
              studioId={data.user.studio_id || null}
              uid={data.user.uid || null}
            />
          ) : (
            <GeneralInfo uid={data.user.uid || null} />
          )}
        </>
      )}

      {data.user.has_studio ? (
        <div>
          {status === 'ready' && (
            <GeneralInfoEdit
              studioId={data.user.studio_id || null}
              uid={data.user.uid || null}
            />
          )}
        </div>
      ) : (
        <GeneralInfo uid={data.user.uid || null} />
      )}
    </LayoutStepsStudio>
  )
}
