import { getStudioInfo } from 'lib/queries/studios'
import useSWR from 'swr'
import { StudioTypes } from 'types/studio'
import PhotoAddMain from './PhotoAddMain'

import PhotoReady from './PhotoReady'

const PhotosInfo = ({ studioId, hasStudio }) => {
  const { data } = useSWR(['getStudioInfo', studioId], getStudioInfo) // esta es la que necesito que vuelva a validar

  return (
    <div className="w-full pr-5 2xl:w-4/5  mt-10 text-gray-200">
      <div className="flex justify-between">
        <h1 className="text-xl sm:text-2xl font-bold  sm:text-left tracking-wide mb-2">
          Fotos del estudio
        </h1>
      </div>

      {data?.studio?.profile_picture ? (
        <PhotoReady studio={data?.studio} />
      ) : (
        <PhotoAddMain studioId={studioId} hasStudio={hasStudio} />
      )}
    </div>
  )
}

export default PhotosInfo
