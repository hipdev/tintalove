import Compressor from 'compressorjs'
import useArtistRealtime from 'hooks/realtime/use-artist'
import { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { HiOutlineCamera } from 'react-icons/hi'

import PictureCrop from './picture-crop'

const PictureAddMain = ({ studioId, hasStudio }) => {
  const [picture, setPicture] = useState(null)
  const { artist } = useArtistRealtime(studioId)

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
      maxWidth: 1400,
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
    <div className="w-4/5 mt-5">
      <p className="mb-10 text-gray-300">
        La primera foto es recomendable que sea el logo, es la que va a salir en
        todas las busquedas.
      </p>
      <div className="flex justify-between">
        {picture && (
          <label className="text-white tracking-wide flex items-center cursor-pointer">
            <HiOutlineCamera className="text-xl" />{' '}
            <span className="ml-2">Cambiar foto</span>
            <input
              type="file"
              className="hidden top-0 right-0 bottom-0 left-0 w-full h-full opacity-0"
              accept="image/*"
              onChange={handlePicture}
            />
          </label>
        )}
      </div>
      {picture && (
        <div className="flex">
          <PictureCrop
            picture={picture}
            setPicture={setPicture}
            studioId={studioId}
          />
        </div>
      )}
      {!picture && (
        <div className="flex justify-center">
          <label className="w-96 h-72 flex flex-col justify-center items-center border-4 border-dashed border-gray-200 rounded-xl mb-5 sm:mb-0 cursor-pointer">
            <span className="text-4xl text-light-900 mb-4">
              <FaRegUserCircle />
            </span>
            <p className="text-sm sm:text-base text-white text-center mb-4">
              JPG, GIF or PNG.
            </p>
            <div className="relative bg-gr-500 hover:bg-gr-700 px-4 py-3 rounded-lg ">
              <div className="text-white tracking-wide">
                Seleccionar foto
                <input
                  type="file"
                  className="absolute top-0 right-0 bottom-0 left-0 w-full h-full opacity-0  cursor-pointer"
                  accept="image/*"
                  onChange={handlePicture}
                />
              </div>
            </div>
          </label>
        </div>
      )}
    </div>
  )
}

export default PictureAddMain
