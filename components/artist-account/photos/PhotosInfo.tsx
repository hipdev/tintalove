import PhotosAddMain from './PhotosAddMain'

import PhotoReady from './PhotoReady'

const PicturesInfo = ({ uid, artist }) => {
  return (
    <div className="w-full pr-5 2xl:w-4/5  mt-10 text-gray-200">
      <div className="flex justify-between">
        <h1 className="text-xl sm:text-2xl font-bold  sm:text-left tracking-wide mb-2">
          Fotos de perfil
        </h1>
      </div>

      {artist?.main_photo_id ? (
        <PhotoReady artist={artist} />
      ) : (
        <PhotosAddMain uid={uid} artist={artist} />
      )}
    </div>
  )
}

export default PicturesInfo
