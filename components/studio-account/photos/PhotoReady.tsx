import Compressor from 'compressorjs'
import { useState } from 'react'
import { HiOutlineCamera } from 'react-icons/hi'
import { StudioTypes } from 'types/studio'
import MorePhotos from './MorePhotos'
import PhotoCrop from './PhotoCrop'

const PhotoReady = ({ studio, uid }) => {
  const [picture, setPicture] = useState(null)

  const handlePicture = (e: any) => {
    e.preventDefault()

    let files
    if (e.dataTransfer) {
      // usefull for DragAndDrop files
      files = e.dataTransfer.files
    } else if (e.target) {
      // normal input file
      files = e.target.files
    }

    new Compressor(files[0], {
      quality: 0.8,
      maxWidth: 800,
      mimeType: 'image/jpeg',
      success(result) {
        const reader = new FileReader()
        reader.onload = () => {
          setPicture(reader.result as any)
        }
        reader.readAsDataURL(result)
      },
      error(err) {
        console.log(err.message)
      },
    })
  }

  return (
    <div className="flex mt-7 flex-wrap">
      <div className="w-full sm:w-2/5">
        <h2 className="mb-3 text-xl">Foto principal</h2>
        <img
          className="rounded-md"
          src={`${studio.studios_main_photos.url}/tr:pr-true,c-at_max,f-auto,w-360,q-100`}
        />

        <label className="text-white tracking-wide flex items-center cursor-pointer mt-3">
          <HiOutlineCamera className="text-xl" />
          <span className="ml-5">Cambiar foto principal</span>
          <input
            type="file"
            className="hidden top-0 right-0 bottom-0 left-0 w-full h-full opacity-0"
            accept="image/*"
            onChange={handlePicture}
          />
        </label>
      </div>

      {!picture && <MorePhotos studio={studio} />}

      {picture && (
        <div className="w-full sm:w-3/5 pl-0 sm:pl-10">
          <PhotoCrop
            update
            actualPictureId={studio.studios_main_photos.url} // no se usa, no se eliminan fotos por ahora principales
            picture={picture}
            studioId={studio.id}
            setPicture={setPicture}
            studioData={studio}
            uid={uid}
          />
        </div>
      )}
    </div>
  )
}

export default PhotoReady
