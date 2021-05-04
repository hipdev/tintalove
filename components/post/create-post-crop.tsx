import axios from 'axios'
import fetcher from 'lib/fetcher'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import useSWR, { mutate } from 'swr'

import { updateArtistMainProfilePicture } from 'lib/db'

import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

type Props = {
  picture: any
  clearPicture?: any
  uid: string
  update?: boolean
  actualPictureId?: string
  setPicture?: any
  dataForm?: any
  isPortrait?: boolean
}

const CreatePostCrop = ({
  picture,
  uid,
  update,
  actualPictureId,
  setPicture,
  isPortrait,
  dataForm,
}: Props) => {
  const [loading, setLoading] = useState(false)
  const imgRef = useRef(null)

  const [crop, setCrop]: any = useState({
    aspect: 6 / 7,
    unit: '%',
    width: 100,
    // height: 100,
  })

  useEffect(() => {
    setCrop({
      aspect: isPortrait ? 6 / 7 : 16 / 9,
      unit: '%',
      width: 100,
      // height: 100,
    })
  }, [isPortrait, picture])

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
    // console.log(dataForm, 'campos')
    const canvas = getResizedCanvas()
    const file: any = canvas.toDataURL('image/jpeg')

    if (dataForm.description != '' && dataForm.styles != '') {
      mutate('/api/imagekit/auth')

      if (!crop || !canvas) {
        toast('Ocurrió un error con la foto')
        return
      }

      const dataFile: any = new FormData()
      dataFile.append('fileName', (file && file.name) || 'cropped')
      dataFile.append('file', file)
      dataFile.append('publicKey', 'public_EUtZgctR8vm6PmW9JTeqTLQI4AM=')
      dataFile.append('signature', data.signature)
      dataFile.append('expire', data.expire)
      dataFile.append('token', data.token)
      await axios
        .post('https://upload.imagekit.io/api/v1/files/upload', dataFile)
        .then(async ({ data: fileImagekit }: any) => {
          const content = {
            filePath: fileImagekit.filePath,
            size: fileImagekit.size,
            fileId: fileImagekit.fileId,
            url: fileImagekit.url,
            name: fileImagekit.name,
            thumbnailUrl: fileImagekit.url,
          }
          try {
            console.log(content, uid, 'la foto en imagekit')
            // toast.promise(
            //   updateArtistMainProfilePicture(
            //     uid,
            //     content,
            //     update,
            //     actualPictureId,
            //     true
            //   ),
            //   {
            //     loading: 'Actualizando...',
            //     success: () => {
            //       setLoading(false)
            //       setPicture(null)
            //       return 'Foto actualizada 😉'
            //     },
            //     error: (err) => {
            //       setLoading(false)
            //       return `${err.toString()}`
            //     },
            //   }
            // )
          } catch (error) {
            console.error(error)
          }
        })
    } else {
      toast('Agrega la descripción y al menos un estilo')
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
        className="block btn-primary py-3 px-5 mt-4 absolute bottom-10 w-2/3 md:relative right-0 left-0 mx-auto"
        disabled={loading}
      >
        {update ? 'Actualizar' : 'Crear post'}
      </button>
    </div>
  )
}

export default CreatePostCrop
