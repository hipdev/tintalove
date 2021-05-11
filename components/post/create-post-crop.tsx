import axios from 'axios'
import fetcher from 'lib/fetcher'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import useSWR, { mutate } from 'swr'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useRouter } from 'next/router'
import { createArtistPost } from 'lib/queries/posts'

type Props = {
  picture: any
  clearPicture?: any
  uid: string
  dataForm?: any
  artist?: any
  pictureSize?: string
}

const CreatePostCrop = ({
  picture,
  uid,
  pictureSize,
  dataForm,
  artist,
}: Props) => {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const imgRef = useRef(null)

  const router = useRouter()

  const [crop, setCrop]: any = useState({
    aspect: 6 / 7,
    unit: '%',
    width: 100,
    // height: 100,
  })

  useEffect(() => {
    setCrop({
      aspect:
        pictureSize == 'portrait'
          ? 3 / 4
          : pictureSize == 'landscape'
          ? 4 / 3
          : 1 / 1,
      unit: '%',
      width: 100,
      // height: 100,
    })
  }, [pictureSize, picture])

  const onLoad = useCallback((img) => {
    imgRef.current = img
  }, [])

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => router.push('/' + artist.username), 1000)
      return () => clearTimeout(timer)
    }
  }, [success])

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
    const canvas = getResizedCanvas()
    const file: any = canvas.toDataURL('image/jpeg')

    if (dataForm.description != '' && dataForm.styles.length > 0) {
      mutate('/api/imagekit/auth')
      if (!crop || !canvas) {
        setLoading(false)
        toast('Ocurrió un error con la foto')
        return
      }
      const dataFile: any = new FormData()
      dataFile.append('fileName', uid || 'cropped')
      dataFile.append('file', file)
      dataFile.append('publicKey', 'public_EUtZgctR8vm6PmW9JTeqTLQI4AM=')
      dataFile.append('signature', data.signature)
      dataFile.append('expire', data.expire)
      dataFile.append('token', data.token)
      await axios
        .post('https://upload.imagekit.io/api/v1/files/upload', dataFile)
        .then(async ({ data: fileImagekit }: any) => {
          const pictureInfo = {
            filePath: fileImagekit.filePath,
            size: fileImagekit.size,
            fileId: fileImagekit.fileId,
            url: fileImagekit.url,
            name: fileImagekit.name,
            thumbnailUrl: fileImagekit.url,
          }
          try {
            toast.promise(
              createArtistPost(uid, pictureInfo, dataForm, artist, pictureSize),
              {
                loading: 'Creando post...',
                success: () => {
                  setLoading(false)
                  setSuccess(true)
                  return 'Post creado 😉'
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
    } else {
      toast('Agrega la descripción y al menos un estilo')
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col ">
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
      <p className="text-sm mb-3 mt-5 text-gray-400">
        Puedes mover y hacer zoom con la foto, el cuadrado indica las
        proporciones requeridas para la foto de perfil.
      </p>

      <div className="mb-14 flex justify-center">
        <ReactCrop
          src={picture}
          crop={crop}
          onImageLoaded={onLoad}
          onChange={(c) => setCrop(c)}
          imageStyle={{ maxHeight: '600px' }}
        />
      </div>

      <button
        onClick={getCropData}
        className="btn-primary py-3 px-5 mt-4 absolute bottom-10 w-2/3 md:relative right-0 left-0 mx-auto flex justify-center"
        disabled={loading}
      >
        {loading ? 'Creando el post...' : 'Crear post'}
        {loading && (
          <svg
            className="animate-spin  ml-3 h-5 w-5 text-white"
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

export default CreatePostCrop
