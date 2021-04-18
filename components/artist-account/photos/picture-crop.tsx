import axios from 'axios'
import Compressor from 'compressorjs'
import fetcher from 'lib/fetcher'
import { useState } from 'react'
import { Cropper } from 'react-cropper'
import toast, { Toaster } from 'react-hot-toast'
import useSWR, { mutate } from 'swr'
import 'cropperjs/dist/cropper.css'
import { updateArtistMainProfilePicture } from 'lib/db'

type Props = {
  picture: any
  clearPicture?: any
  uid: string
  update?: boolean
}

const PictureCrop = ({ picture, clearPicture, uid, update }: Props) => {
  const [cropper, setCropper] = useState<any>()
  const [loading, setLoading] = useState(false)

  const { data }: any = useSWR('/api/imagekit/auth', fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  })

  console.log(data, 'the imagekit data')

  const getCropData = async () => {
    mutate('/api/imagekit/auth')
    if (typeof cropper !== 'undefined') {
      const file = cropper
        .getCroppedCanvas({ imageSmoothingQuality: 'high' })
        .toDataURL('image/jpeg')

      console.log(cropper.getCanvasData(), cropper, 'el archivo aca')

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
            console.log(content, 'la foto en imagekit')

            toast.promise(updateArtistMainProfilePicture(uid, content), {
              loading: 'Actualizando...',
              success: () => {
                setLoading(false)

                return 'Artista actualizado 😉'
              },
              error: (err) => {
                setLoading(false)
                return `${err.toString()}`
              },
            })

            // const response: any = await axios.put(
            //   `api/profile/update-picture`,
            //   content
            // )

            // if (response.status !== 200) {
            //   throw new Error(response.data)
            // }
            // mutate('profile')
            // cropper.reset()
            // cropper.destroy()
          } catch (error) {
            console.error(error)
          }
        })
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
      <p className="text-sm mb-3 mt-5">
        Puedes mover y hacer zoom con la foto, el cuadrado indica las
        proporciones requeridas para la foto de perfil.
      </p>
      <Cropper
        style={{ height: '60vh', width: '100%' }}
        initialAspectRatio={1}
        aspectRatio={6 / 7}
        src={picture}
        viewMode={0}
        dragMode="move"
        autoCropArea={1}
        guides={false}
        cropBoxResizable={false}
        cropBoxMovable={false}
        background={false}
        responsive={true}
        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
        onInitialized={(instance: any) => {
          setCropper(instance)
        }}
      />
      <button
        onClick={getCropData}
        className="block btn-red py-3 px-5 mt-4"
        disabled={loading}
      >
        {update ? 'Actualizar' : 'Guardar'}
      </button>
    </div>
  )
}

export default PictureCrop
