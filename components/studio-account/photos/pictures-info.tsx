import useArtistRealtime from 'hooks/realtime/use-artist'
import { getStudioInfo } from 'lib/queries/studios'
import useSWR from 'swr'
import { StudioTypes } from 'types/studio'
import PictureAddMain from './picture-add-main'

import PictureReady from './picture-ready'

const PicturesInfo = ({ studioId, hasStudio }) => {
  const { data }: { data?: { studio: StudioTypes } } = useSWR(
    ['getStudioInfo', studioId],
    getStudioInfo
  )

  console.log(data, 'esta data')

  return (
    <div className="w-full pr-5 2xl:w-4/5  mt-10 text-gray-200">
      <div className="flex justify-between">
        <h1 className="text-xl sm:text-2xl font-bold  sm:text-left tracking-wide mb-2">
          Fotos del estudio
        </h1>
      </div>

      {data?.studio?.profile_picture ? (
        <PictureReady studio={data?.studio?.id} />
      ) : (
        <PictureAddMain studioId={studioId} hasStudio={hasStudio} />
      )}
    </div>
  )
}

export default PicturesInfo
