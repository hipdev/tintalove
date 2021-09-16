import { deletePictureFromStudio } from 'lib/queries/studios'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { AiOutlineDelete } from 'react-icons/ai'

const myLoader = ({ src, width, quality }) => {
  return `${src}/tr:pr-true,c-at_max,f-auto,w-${width},q-${quality || 75}`
}

const MorePicturesList = ({ studio, pictures, mutatePictures }) => {
  const handleDelete = (fileId, pictureId) => {
    console.log(fileId)

    toast.promise(deletePictureFromStudio(fileId, pictureId), {
      loading: 'Eliminando...',
      success: () => {
        mutatePictures()

        return 'Foto eliminada 😉'
      },
      error: (err) => {
        return `${err.toString()}`
      },
    })
  }
  console.log(pictures, 'fotos')
  return (
    <div className="grid grid-cols-2 gap-3 mb-10">
      {pictures.map((pic) => (
        <div className="relative group overflow-hidden rounded-md" key={pic.id}>
          <div className="relative w-full aspect-w-5 aspect-h-3    border-none z-30">
            <Image
              key={pic.fileId}
              loader={myLoader}
              src={pic?.url}
              alt="Artist photo"
              layout="fill"
              // width={600}
              // height={500}
              sizes="100%"
              className="w-full object-cover  max-h-96"
            />
          </div>
          <button
            className="absolute group-hover:z-50 right-1 bottom-2 z-10"
            onClick={() => handleDelete(pic.fileId, pic.id)}
          >
            <AiOutlineDelete className="text-2xl text-primary " />
          </button>
          <div className="absolute group-hover:z-40 w-full bottom-0 bg-gradient-to-b from-transparent to-black h-20"></div>
        </div>
      ))}
    </div>
  )
}

export default MorePicturesList
