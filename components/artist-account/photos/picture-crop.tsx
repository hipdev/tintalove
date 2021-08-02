import fetcher from 'lib/fetcher'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import useSWR, { mutate } from 'swr'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { updateArtistMainProfilePicture } from 'lib/queries/artists'
import { AiOutlineClose } from 'react-icons/ai'

type Props = {
  picture: any
  clearPicture?: any
  uid: string
  update?: boolean
  actualPictureId?: string
  setPicture?: any
}

const PictureCrop = ({
  picture,
  uid,
  update,
  actualPictureId,
  setPicture,
}: Props) => {
  const [loading, setLoading] = useState(false)

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
          const content = {
            filePath: fileImagekit.filePath,
            size: fileImagekit.size,
            fileId: fileImagekit.fileId,
            url: fileImagekit.url,
            name: fileImagekit.name,
            thumbnailUrl: fileImagekit.url,
          }
          try {
            toast.promise(updateArtistMainProfilePicture(uid, content, true), {
              loading: 'Actualizando...',
              success: () => {
                setLoading(false)
                setPicture(null)
                mutate(uid)

                return 'Foto actualizada 😉'
              },
              error: (err) => {
                setLoading(false)
                return `${err.toString()}`
              },
            })
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
        className="block btn-primary py-3 px-5 mt-4"
        disabled={loading}
      >
        {update ? 'Actualizar' : 'Guardar'}
      </button>
    </div>
  )
}

export default PictureCrop
