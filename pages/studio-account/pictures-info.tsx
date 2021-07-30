import LayoutStepsStudio from 'components/layout-steps/LayoutStepsStudio'
import IsAuth from 'components/isAuth'

import useUserId from 'hooks/use-user-id'
import useSWR from 'swr'
import { getUserInfo } from 'lib/queries/users'
import PicturesInfo from 'components/studio-account/photos/pictures-info'

export default function PictureInfoPage() {
  const { userId } = useUserId()
  const { data } = useSWR(userId ? userId : null, getUserInfo)

  if (!data && !data?.user) {
    return <IsAuth>Cargando data...</IsAuth>
  }

  return (
    <LayoutStepsStudio uid={userId} user={data.user}>
      <PicturesInfo
        hasStudio={data.user.has_studio}
        studioId={data.user.studio_id}
      />
    </LayoutStepsStudio>
  )
}
