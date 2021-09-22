import fetcher from 'lib/fetcher'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import useSWR, { mutate } from 'swr'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { updateArtistMainProfilePicture } from 'lib/queries/artists'
import { AiOutlineClose } from 'react-icons/ai'
import { useUser } from 'hooks/useUser'

type Props = {
  artist: any
  picture: any
  clearPicture?: any
  uid: string
  update?: boolean
  actualPictureId?: string
  setPicture?: any
}

const PhotoCrop = ({
  artist,
  picture,
  uid,
  update,
  actualPictureId,
  setPicture,
}: Props) => {
  const [loading, setLoading] = useState(false)

  const { user, setUser } = useUser()

  const [crop, setCrop]: any = useState({
    aspect: 3 / 4,
    unit: '%',
    width: 100,
    // height: 100,
  })

  useEffect(() => {
    setCrop({
      aspect: 3 / 4,
      unit: '%',
      width: 100,
      // height: 100,
    })
  }, [setPicture])

  const imgRef = useRef(null)

  const onLoad = useCallback((img) => {
    imgRef.current = img
  }, [])

  const { data }: any = useSWR('/api/imagekit/auth', fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  })

  const getResizedCanvas = () => {
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height
    const tmpCanvas = document.createElement('canvas')
    tmpCanvas.width = Math.ceil(crop.width * scaleX)
    tmpCanvas.height = Math.ceil(crop.height * scaleY)

    const ctx = tmpCanvas.getContext('2d')
    const image = imgRef.current
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    )

    return tmpCanvas
  }

  const getCropData = async () => {
    setLoading(true)
    mutate('/api/imagekit/auth')

    const canvas = getResizedCanvas()
    const file: any = canvas.toDataURL('image/jpeg')

    if (!crop || !canvas) {
      setLoading(false)
      toast('Ocurrió un error con la foto')
      return
    }

    if (crop) {
      const dataFile: any = new FormData()

      dataFile.append('fileName', uid || 'cropped')
      dataFile.append('file', file)
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
          const dataPhoto = {
            file_path: fileImagekit.filePath,
            size: fileImagekit.size,
            file_id: fileImagekit.fileId,
            url: fileImagekit.url,
            name: fileImagekit.name,
            thumbnail: fileImagekit.thumbnailUrl,
          }
          try {
            toast.promise(
              updateArtistMainProfilePicture(uid, dataPhoto, artist),
              {
                loading: 'Actualizando...',
                success: () => {
                  setLoading(false)
                  setPicture(null)
                  mutate(['getArtistFullInfo', uid])
                  setUser({ ...user, main_photo: dataPhoto })

                  return 'Foto actualizada 😉'
                },
                error: (err) => {
                  setLoading(false)
                  return `${err.toString()}`
                },
              }
            )
          } catch (error) {
            console.error(error)
          }
        })
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        <p className="text-sm mb-3 mt-5">
          Puedes mover la foto, el cuadrado indica las proporciones requeridas
          para la foto de perfil.
        </p>
        <AiOutlineClose
          onClick={() => setPicture(false)}
          className="text-2xl ml-5 cursor-pointer"
        />
      </div>
      <ReactCrop
        src={picture}
        crop={crop}
        onImageLoaded={onLoad}
        onChange={(c) => setCrop(c)}
        imageStyle={{ maxHeight: '600px' }}
      />

      <button
        onClick={getCropData}
        className="flex btn-primary py-3 px-5 mt-4"
        disabled={loading}
      >
        <span>
          {update
            ? loading
              ? 'Actualizando'
              : 'Actualizar'
            : loading
            ? 'Guardando'
            : 'Guardar'}
        </span>

        {loading && (
          <svg
            className="block animate-spin ml-2  h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
      </button>
    </div>
  )
}

export default PhotoCrop
