import GeneralInfo from 'components/studio-account/general-info'
import GeneralInfoEdit from 'components/studio-account/general-info-edit/general-info-edit'
import IsAuth from 'components/isAuth'
import LayoutStepsStudio from 'components/layout-steps/layout-steps-studio'
import useScript from 'hooks/use-script'
import useUserId from 'hooks/use-user-id'
import useSWR from 'swr'
import { getUserInfo } from 'lib/queries/users'

export default function MainInfoPage() {
  const { userId } = useUserId()
  const { data } = useSWR(userId ? userId : null, getUserInfo)
  const status = useScript(
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyA5drETj_sJmO1kGEDEb7tXWzwJb05ipCY&libraries=places'
  )

  if (!data && !data?.user) {
    return <IsAuth>Cargando data...</IsAuth>
  }

  return (
    <LayoutStepsStudio uid={userId} userState={data.user}>
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
