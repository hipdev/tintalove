import LayoutStepsStudio from 'components/layout-steps/LayoutStepsStudio'
import IsAuth from 'components/isAuth'
import useSWR from 'swr'
import PhotosInfo from 'components/studio-account/photos/PhotosInfo'
import { useUser } from 'hooks/useUser'
import { getStudioData } from 'lib/queries/studios'

export default function PictureInfoPage() {
  const { user }: any = useUser()

  const { data: dataStudio } = useSWR(
    user?.id ? ['getStudioData', user.id] : null,
    getStudioData
  )

  if (!user && !dataStudio) {
    return <IsAuth>Cargando data...</IsAuth>
  }

  return (
    <LayoutStepsStudio uid={user.id} user={user}>
      <PhotosInfo studioData={dataStudio} studioId={dataStudio.id} />
    </LayoutStepsStudio>
  )
}
