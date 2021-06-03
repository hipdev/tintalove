import fetcher from 'lib/fetcher'
import { useState } from 'react'
import { Cropper } from 'react-cropper'
import toast from 'react-hot-toast'
import useSWR, { mutate } from 'swr'
import 'cropperjs/dist/cropper.css'
import { updateArtistMainProfilePicture } from 'lib/queries/artists'

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
  const [cropper, setCropper] = useState<any>()
  const [loading, setLoading] = useState(false)

  const { data }: any = useSWR('/api/imagekit/auth', fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  })

  const getCropData = async () => {
    mutate('/api/imagekit/auth')
    if (typeof cropper !== 'undefined') {
      const file = cropper
        .getCroppedCanvas({ imageSmoothingQuality: 'high' })
        .toDataURL('image/jpeg')

      const dataFile: any = new FormData()

      dataFile.append('fileName', uid || 'cropped')
      dataFile.append('file', file)
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
            toast.promise(
              updateArtistMainProfilePicture(
                uid,
                content,
                update,
                actualPictureId,
                true
              ),
              {
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
              }
            )
          } catch (error) {
            console.error(error)
          }
        })
    }
  }

  return (
    <div className="flex flex-col ">
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
        className="block btn-primary py-3 px-5 mt-4"
        disabled={loading}
      >
        {update ? 'Actualizar' : 'Guardar'}
      </button>
    </div>
  )
}

export default PictureCrop
