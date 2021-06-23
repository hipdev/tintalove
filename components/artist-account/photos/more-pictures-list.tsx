import { getArtistsPictures } from 'lib/queries/artists'
import Image from 'next/image'
import useSWR from 'swr'

const myLoader = ({ src, width, quality }) => {
  return `${src}/tr:pr-true,w-${width},q-${quality || 75}`
}

const MorePicturesList = ({ artist }) => {
  const { data }: any = useSWR(
    ['getArtistPictures', artist?.uid],
    getArtistsPictures
  )

  return (
    <div>
      {data?.pictures ? (
        <div className="grid grid-cols-3 gap-5">
          {data.pictures.map((pic) => (
            <div className="relative h-40">
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
      ) : null}
    </div>
  )
}

export default MorePicturesList
