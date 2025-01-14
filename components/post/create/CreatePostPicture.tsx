import Compressor from 'compressorjs'
import { useState } from 'react'
import { HiOutlineCamera } from 'react-icons/hi'
import { BsArrowUp } from 'react-icons/bs'
import CreatePostCrop from './CreatePostCrop'

const CreatePostPicture = ({
  uid,
  dataForm,
  setWithPicture,
  pictureSize,
  artist,
}) => {
  const [picture, setPicture] = useState(null)

  const handlePicture = (e: any) => {
    e.preventDefault()
    setWithPicture(true)

    let files
    if (e.dataTransfer) {
      // usefull for DragAndDrop files
      files = e.dataTransfer.files
    } else if (e.target) {
      // normal input file
      files = e.target.files
    }

    new Compressor(files[0], {
      quality: 0.9,
      maxWidth: 1980,
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
    <div>
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
          <CreatePostCrop
            picture={picture}
            uid={uid}
            dataForm={dataForm}
            pictureSize={pictureSize}
            artist={artist}
            setWithPicture={setWithPicture}
            setPicture={setPicture}
          />
        </div>
      )}

      {!picture && (
        <div className="flex flex-col justify-center">
          <label className="w-full h-448 sm:h-609 relative flex flex-col justify-center items-center border-4 border-dashed border-gray-200 rounded-xl mb-5 sm:mb-0">
            <div className="flex flex-col items-center justify-center w-full h-448 sm:h-609">
              <div className="grid place-items-center w-24 h-24 bg-dark-500 rounded-full mb-5">
                <span className="text-green-500 text-5xl">
                  <BsArrowUp />
                </span>
              </div>
              <p className="text-white">JPG, GIF or PNG. Max size of 800K</p>
              <button className="text-white bg-primary hover:bg-primaryHover mt-5 py-3 px-6 rounded-md focus:outline-none">
                Seleccionar Archivo
              </button>
            </div>
            <input
              type="file"
              className="absolute top-0 right-0 bottom-0 left-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              onChange={handlePicture}
            />
          </label>
        </div>
      )}
    </div>
  )
}

export default CreatePostPicture
