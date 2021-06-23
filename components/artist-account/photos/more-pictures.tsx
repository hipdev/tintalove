import Compressor from 'compressorjs'
import fetcher from 'lib/fetcher'
import { addArtistPicture } from 'lib/queries/artists'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { HiOutlineCamera } from 'react-icons/hi'
import useSWR from 'swr'
import MorePicturesList from './more-pictures-list'

const MorePicturesArtist = ({ artist }) => {
  const [anotherPicture, setAnotherPicture] = useState(null)

  const { data }: any = useSWR('/api/imagekit/auth', fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  })

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
      quality: 0.9,
      maxWidth: 1600,
      mimeType: 'image/jpeg',
      success(result) {
        const reader = new FileReader()
        reader.onload = async () => {
          setAnotherPicture(reader.result as any)

          const dataFile: any = new FormData()

          dataFile.append('fileName', artist?.uid || 'cropped')
          dataFile.append('file', reader.result)
          dataFile.append('publicKey', 'public_EUtZgctR8vm6PmW9JTeqTLQI4AM=')
          dataFile.append('signature', data.signature)
          dataFile.append('expire', data.expire)
          dataFile.append('token', data.token)

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
                    // setLoading(false)
                    setAnotherPicture(null)

                    return 'Foto añadida 😉'
                  },
                  error: (err) => {
                    // setLoading(false)
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

  console.log(anotherPicture, 'blob')

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

      <MorePicturesList artist={artist} />
    </div>
  )
}

export default MorePicturesArtist
