import Image from 'next/image'

const myLoader = ({ src, width, quality }) => {
  return `${src}/tr:pr-true,w-${width},q-${quality || 75}`
}

const MorePicturesList = ({ artist, pictures }) => {
  return (
    <div className="grid grid-cols-3 gap-5">
      {pictures.map((pic) => (
        <div className="relative h-40" key={pic.fileId}>
          <Image
            key={pic.fileId}
            loader={myLoader}
            src={pic?.url}
            alt="Artist photo"
            layout="fill"
            // width={600}
            // height={500}
            sizes="100%"
            className="w-full rounded-md  object-cover"
          />
        </div>
      ))}
    </div>
  )
}

export default MorePicturesList
