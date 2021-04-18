import Compressor from 'compressorjs'
import useArtistRealtime from 'hooks/realtime/use-artist'
import { useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { FaRegUserCircle } from 'react-icons/fa'
import { HiOutlineCamera } from 'react-icons/hi'

import PictureCrop from './picture-crop'

const PictureAddMain = ({ uid, isArtist }) => {
  const [picture, setPicture] = useState(null)
  const { artist } = useArtistRealtime(uid)

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

  console.log(artist, 'el artist realtime')

  return (
    <div className="w-4/5 mt-10">
      <Toaster
        toastOptions={{
          className: 'bg-red-600',
          style: {
            background: '#ef3e30',
            border: 'none',
            borderRadius: '3px',
            color: '#fff',
          },
          duration: 5000,
        }}
        position="bottom-right"
      />
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
          <PictureCrop picture={picture} setPicture={setPicture} uid={uid} />
        </div>
      )}

      {!picture && (
        <div className="flex justify-center">
          <div className="w-96 h-72 flex flex-col justify-center items-center border-4 border-dashed border-gray-200 rounded-xl mb-5 sm:mb-0">
            <span className="text-4xl text-light-900 mb-4">
              <FaRegUserCircle />
            </span>
            <p className="text-sm sm:text-base text-white text-center mb-4">
              JPG, GIF or PNG.
            </p>
            <div className="relative bg-light-900 px-4 py-3 rounded-lg">
              <label className="text-white tracking-wide">
                Seleccionar foto
                <input
                  type="file"
                  className="absolute top-0 right-0 bottom-0 left-0 w-full h-full opacity-0"
                  accept="image/*"
                  onChange={handlePicture}
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PictureAddMain
