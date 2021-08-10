import Compressor from 'compressorjs'
import fetcher from 'lib/fetcher'
import { addArtistPicture, getArtistPictures } from 'lib/queries/artists'

import toast from 'react-hot-toast'
import { HiOutlineCamera } from 'react-icons/hi'
import useSWR from 'swr'
import MorePicturesList from './more-pictures-list'

const MorePicturesArtist = ({ artist }) => {
  const { data, mutate: mutateToken }: any = useSWR(
    '/api/imagekit/auth',
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  )

  const { data: dataPictures, mutate: mutatePictures }: any = useSWR(
    ['getArtistPictures', artist?.uid],
    getArtistPictures
  )

  const handlePicture = async (e: any) => {
    e.preventDefault()

    toast('Procesando foto...')

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
        reader.onload = async () => {
          let dataFile: any = new FormData()

          dataFile.append('fileName', artist?.uid || 'cropped')
          dataFile.append('file', reader.result)
          dataFile.append('publicKey', 'public_EUtZgctR8vm6PmW9JTeqTLQI4AM=')
          dataFile.append('signature', data.signature)
          dataFile.append('expire', data.expire)
          dataFile.append('token', data.token)
          dataFile.append('folder', 'artists')

          const options = {
            method: 'POST',
            body: dataFile,
          }

          await fetch('https://upload.imagekit.io/api/v1/files/upload', options)
            .then((response) => response.json())
            .then(async (fileImagekit) => {
              const content = {
                filePath: fileImagekit.filePath,
                size: fileImagekit.size,
                fileId: fileImagekit.fileId,
                url: fileImagekit.url,
                name: fileImagekit.name,
                thumbnailUrl: fileImagekit.url,
              }
              try {
                toast.promise(addArtistPicture(artist?.uid, content), {
                  loading: 'Actualizando...',
                  success: () => {
                    mutatePictures()
                    mutateToken()

                    return 'Foto añadida 😉'
                  },
                  error: (err) => {
                    return `${err.toString()}`
                  },
                })
              } catch (error) {
                console.error(error)
              }
            })
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

      {dataPictures?.pictures?.length > 0 && (
        <MorePicturesList
          artist={artist}
          pictures={dataPictures?.pictures}
          mutatePictures={mutatePictures}
        />
      )}
    </div>
  )
}

export default MorePicturesArtist
