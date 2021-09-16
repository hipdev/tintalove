import Compressor from 'compressorjs'
import fetcher from 'lib/fetcher'
import { getStudioPictures } from 'lib/queries/studios'
import { useState } from 'react'
import { HiOutlineCamera } from 'react-icons/hi'
import useSWR from 'swr'
import MorePhotosCrop from './MorePhotosCrop'
import MorePicturesList from './MorePhotosList'

const MorePhotos = ({ studio }) => {
  const [picture, setPicture] = useState(null)

  const { data, mutate: mutateToken }: any = useSWR(
    '/api/imagekit/auth',
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  )

  const { data: dataPictures, mutate: mutatePictures }: any = useSWR(
    ['getStudioPictures', studio?.id],
    getStudioPictures
  )

  const handlePicture = async (e: any) => {
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
      quality: 0.9,
      maxWidth: 1600,
      mimeType: 'image/jpeg',
      success(result) {
        let reader = new FileReader()
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
    <div className="w-full sm:w-3/5 pl-0 sm:pl-10">
      <h2 className="mb-3 text-xl">Agregar mas fotos</h2>
      <p className="text-sm  mb-2">
        Los usuarios podrán ver mas fotos al presionar tu imagen principal.
      </p>

      <label className="text-white tracking-wide flex items-center cursor-pointer mb-2">
        <HiOutlineCamera className="text-xl" />
        <span className="ml-2">Añadir foto</span>
        <input
          type="file"
          className="hidden top-0 right-0 bottom-0 left-0 w-full h-full opacity-0"
          accept="image/*"
          onChange={handlePicture}
        />
      </label>

      {picture && (
        <div className="flex">
          <MorePhotosCrop
            picture={picture}
            setPicture={setPicture}
            studioId={studio?.id}
            mutateToken={mutateToken}
            mutatePictures={mutatePictures}
          />
        </div>
      )}

      {dataPictures?.pictures?.length > 0 && (
        <MorePicturesList
          studio={studio}
          pictures={dataPictures?.pictures}
          mutatePictures={mutatePictures}
        />
      )}
    </div>
  )
}

export default MorePhotos
