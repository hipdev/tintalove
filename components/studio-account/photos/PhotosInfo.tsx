import PhotoAddMain from './PhotoAddMain'
import PhotoReady from './PhotoReady'

const PhotosInfo = ({ studioId, dataStudio, uid }) => {
  return (
    <div className="w-full pr-5 2xl:w-4/5  mt-10 text-gray-200">
      <div className="flex justify-between">
        <h1 className="text-xl sm:text-2xl font-bold  sm:text-left tracking-wide mb-2">
          Fotos del estudio
        </h1>
      </div>

      {dataStudio?.studios_main_photos?.url ? (
        <PhotoReady studio={dataStudio} uid={uid} />
      ) : (
        <PhotoAddMain studioId={studioId} uid={uid} studioData={dataStudio} />
      )}
    </div>
  )
}

export default PhotosInfo
