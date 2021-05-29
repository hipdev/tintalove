import LayoutStepsStudio from 'components/layout-steps/layout-steps-studio'
import IsAuth from 'components/isAuth'
import PicturesInfoStudio from 'components/studio-account/pictures/pictures-info'
import useUserId from 'hooks/use-user-id'
import useSWR from 'swr'
import { getUserInfo } from 'lib/queries/users'

export default function PictureInfoPage() {
  const { userId } = useUserId()
  const { data } = useSWR(userId ? userId : null, getUserInfo)

  if (!data && !data?.user) {
    return <IsAuth>Cargando data...</IsAuth>
  }

  return (
    <LayoutStepsStudio uid={userId} user={data.user}>
      <PicturesInfoStudio
        hasStudio={data.user.has_studio}
        studioId={data.user.studio_id}
      />
    </LayoutStepsStudio>
  )
}
