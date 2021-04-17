import axios from 'axios'
import Compressor from 'compressorjs'
import fetcher from 'lib/fetcher'
import { useState } from 'react'
import { Cropper } from 'react-cropper'
import { Toaster } from 'react-hot-toast'
import useSWR, { mutate } from 'swr'
import 'cropperjs/dist/cropper.css'

const PictureCrop = ({ picture, clearPicture }) => {
  const [cropper, setCropper] = useState<any>()

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
      dataFile.append('publicKey', 'public_ErRILqyPLPmjLV+o78P2VWkWI58=')
      dataFile.append('signature', data.signature)
      dataFile.append('expire', data.expire)
      dataFile.append('token', data.token)

      await axios
        .post('https://upload.imagekit.io/api/v1/files/upload', dataFile)
        .then(async ({ data: fileImagekit }: any) => {
          const content = {
            contentMedia: {
              filePath: fileImagekit.filePath,
              size: fileImagekit.size,
              fileId: fileImagekit.fileId,
              url: fileImagekit.url,
              name: fileImagekit.name,
              thumbnailUrl: fileImagekit.url,
            },
          }
          try {
            const response: any = await axios.put(
              `api/profile/update-picture`,
              content
            )

            if (response.status !== 200) {
              throw new Error(response.data)
            }
            mutate('profile')
            cropper.reset()
            cropper.destroy()
          } catch (error) {
            console.error(error)
          }
        })
    }
  }

  return (
    <div>
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
      <Cropper
        style={{ height: '72vh', width: '100%' }}
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
      <button className="block btn-red py-3 px-5">Guardar</button>
    </div>
  )
}

export default PictureCrop
