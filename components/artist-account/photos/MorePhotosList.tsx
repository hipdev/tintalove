import { deletePictureFromArtist } from 'lib/queries/artists'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { AiOutlineDelete } from 'react-icons/ai'

const myLoader = ({ src, width, quality }) => {
  return `${src}/tr:pr-true,w-${width},q-${quality || 75}`
}

const MorePhotosList = ({ artist, pictures, mutatePictures }) => {
  const handleDelete = (fileId, pictureId) => {
    toast.promise(deletePictureFromArtist(fileId, pictureId), {
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

  return (
    <div className="grid grid-cols-3 gap-5">
      {pictures.map((pic) => (
        <div
          className="relative h-40 group overflow-hidden rounded-md border-none"
          key={pic.file_id}
        >
          <Image
            key={pic.fileId}
            loader={myLoader}
            src={pic?.url}
            alt="Artist photo"
            layout="fill"
            // width={600}
            // height={500}
            sizes="100%"
            className="w-full object-cover"
          />

          <button
            className="group-hover:absolute right-1 bottom-2 z-10"
            onClick={() => handleDelete(pic.file_id, pic.id)}
          >
            <AiOutlineDelete className="text-2xl text-primary " />
          </button>
          <div className="group-hover:absolute w-full -bottom-2.5 bg-gradient-to-b from-transparent to-black h-20"></div>
        </div>
      ))}
    </div>
  )
}

export default MorePhotosList
