import fetcher from 'lib/fetcher'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import useSWR, { mutate } from 'swr'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useRouter } from 'next/router'
import { createArtistPost } from 'lib/queries/posts'
import { BsArrowRight } from 'react-icons/bs'

type Props = {
  picture: any
  clearPicture?: any
  uid: string
  dataForm?: any
  artist?: any
  pictureSize?: string
  setWithPicture: any
  setPicture: any
}

const CreatePostCrop = ({
  picture,
  uid,
  pictureSize,
  dataForm,
  artist,
  setWithPicture,
  setPicture,
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

    if (dataForm.hasTwoStudios && dataForm.isPartner && !dataForm.studio) {
      setLoading(false)
      toast('Debes seleccionar un estudio')
      return
    }

    if (dataForm.description != '' && dataForm.styles.length > 0) {
      console.log(dataForm, 'form data')
      let formData

      if (dataForm.isPartner) {
        formData = {
          description: dataForm.description,
          studio_id: dataForm.hasTwoStudios
            ? dataForm.studio.value
            : dataForm.onlyOneStudio,
          styles: dataForm.styles,
          is_partner: dataForm.isPartner,
        }
      } else {
        formData = {
          description: dataForm.description,
          styles: dataForm.styles,
          is_partner: dataForm.isPartner,
        }
      }

      console.log(formData, 'la data a enviar')

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
      dataFile.append('folder', 'posts')

      const options = {
        method: 'POST',
        body: dataFile,
      }

      await fetch('https://upload.imagekit.io/api/v1/files/upload', options)
        .then((response) => response.json())
        .then(async (fileImagekit) => {
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
              createArtistPost(uid, pictureInfo, formData, artist, pictureSize),
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
      setLoading(false)
    } else {
      toast('Agrega la descripción y al menos un estilo')
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col ">
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

      <div className="flex gap-4 sm:gap-8 text-white ml-5 justify-center mb-5">
        <button
          onClick={() => {
            setWithPicture(false)
            setPicture(null)
          }}
          className="py-3 px-4 focus:outline-none"
        >
          CANCELAR
        </button>
        <button
          className="flex items-center gap-3 py-3 px-5 sm:px-20 bg-primary hover:bg-primaryHover rounded-md focus:outline-none"
          onClick={getCropData}
          disabled={loading}
        >
          {loading ? 'Creando el post...' : 'PUBLICAR'}
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
    </div>
  )
}

export default CreatePostCrop
