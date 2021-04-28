import Compressor from 'compressorjs'
import { useState } from 'react'
import { HiOutlineCamera } from 'react-icons/hi'
import PictureCrop from './picture-crop'

const PictureReady = ({ artist }) => {
  const [picture, setPicture] = useState(null)
  console.log(artist, 'el artista')

  const handlePicture = (e: any) => {
    e.preventDefault()

    console.log('started crop')

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
    <div className="flex mt-7">
      <div className="w-2/5">
        <h2 className="mb-3 text-xl">Foto principal</h2>
        <img
          className="rounded-md"
          src={`${artist.profile_picture.url}/tr:pr-true,c-at_max,f-auto,w-360,q-100`}
        />

        <label className="text-white tracking-wide flex items-center cursor-pointer mt-3">
          <HiOutlineCamera className="text-xl" />
          <span className="ml-2">Cambiar foto principal</span>
          <input
            type="file"
            className="hidden top-0 right-0 bottom-0 left-0 w-full h-full opacity-0"
            accept="image/*"
            onChange={handlePicture}
          />
        </label>
      </div>

      {!picture && (
        <div className="w-3/5 pl-10">
          <h2 className="mb-3 text-xl">Agregar mas fotos</h2>
          <p className="text-sm  mb-2">
            Los usuarios podrán ver mas fotos al presionar tu imagen principal.
          </p>
          <label className="text-white tracking-wide flex items-center cursor-pointer">
            <HiOutlineCamera className="text-xl" />
            <span className="ml-2">Añadir foto</span>
            {/* <input
              type="file"
              className="hidden top-0 right-0 bottom-0 left-0 w-full h-full opacity-0"
              accept="image/*"
              onChange={handlePicture}
            /> */}
          </label>
        </div>
      )}

      {picture && (
        <div className="w-3/5 pl-10">
          <PictureCrop
            update
            actualPictureId={artist.profile_picture.fileId}
            picture={picture}
            uid={artist.uid}
            setPicture={setPicture}
          />
        </div>
      )}
    </div>
  )
}

export default PictureReady
