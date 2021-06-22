import Compressor from 'compressorjs'
import { useState } from 'react'
import { HiOutlineCamera } from 'react-icons/hi'

const MorePicturesArtist = ({ artist }) => {
  const [anotherPicture, setAnotherPicture] = useState(null)

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
          setAnotherPicture(reader.result as any)
        }
        reader.readAsDataURL(result)
      },
      error(err) {
        console.log(err.message)
      },
    })
  }

  return (
    <div className="w-full sm:w-3/5 pl-0 sm:pl-10">
      <h2 className="mb-3 text-xl">Agregar mas fotos</h2>
      <p className="text-sm  mb-2">
        Los usuarios podrán ver mas fotos al presionar tu imagen principal.
      </p>
      <label className="text-white tracking-wide flex items-center cursor-pointer mb-10">
        <HiOutlineCamera className="text-xl" />
        <span className="ml-2">Añadir foto</span>
        <input
          type="file"
          className="hidden top-0 right-0 bottom-0 left-0 w-full h-full opacity-0"
          accept="image/*"
          onChange={handlePicture}
        />
      </label>

      {anotherPicture && (
        <div className="flex">
          <span>hola</span>
        </div>
      )}
    </div>
  )
}

export default MorePicturesArtist
