import PhotoAddMain from './PhotoAddMain'
import PhotoReady from './PhotoReady'

const PhotosInfo = ({ studioId, studioData, uid }) => {
  return (
    <div className="w-full pr-5 2xl:w-4/5  mt-10 text-gray-200">
      <div className="flex justify-between">
        <h1 className="text-xl sm:text-2xl font-bold  sm:text-left tracking-wide mb-2">
          Fotos del estudio
        </h1>
      </div>

      {studioData?.main_photo_id ? (
        <PhotoReady studio={studioData} />
      ) : (
        <PhotoAddMain studioId={studioId} uid={uid} studioData={studioData} />
      )}
    </div>
  )
}

export default PhotosInfo
