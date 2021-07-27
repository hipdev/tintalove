import { getArtistPosts } from 'lib/queries/posts'
import Link from 'next/link'
import useSWR from 'swr'

type Props = {
  artistId: any
}

const loaderPost = ({ src, quality }: any) => {
  return `${src}/tr:pr-true,c-at_max,f-auto,h-320,q-${quality || 75}`
}

const ArtistsPosts = ({ artistId }: Props) => {
  console.log(artistId, 'artist id')
  const { data } = useSWR(['get-artist-posts', artistId], getArtistPosts)

  console.log(data, 'los posts')

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-5">
      <div className="w-full h-full">
        <div className="overflow-hidden rounded-xl mb-5">
          <img
            src="galaxy3.jpg"
            alt=""
            className="object-cover rounded-xl transition duration-700 ease-in-out transform hover:transform hover:scale-125"
          />
        </div>
        <div className="overflow-hidden rounded-xl mb-5">
          <img
            src="galaxy6.jpg"
            alt=""
            className="object-cover rounded-xl transition duration-700 ease-in-out transform hover:transform hover:scale-125"
          />
        </div>
        <div className="overflow-hidden rounded-xl mb-5">
          <img
            src="galaxy4.jpg"
            alt=""
            className="object-cover rounded-xl transition duration-700 ease-in-out transform hover:transform hover:scale-125"
          />
        </div>
      </div>
      <div className="w-full h-full">
        <div className="overflow-hidden rounded-xl mb-5">
          <img
            src="galaxy3.jpg"
            alt=""
            className="object-cover rounded-xl transition duration-700 ease-in-out transform hover:transform hover:scale-125"
          />
        </div>
        <div className="overflow-hidden rounded-xl mb-5">
          <img
            src="galaxy2.jpg"
            alt=""
            className="object-cover rounded-xl transition duration-700 ease-in-out transform hover:transform hover:scale-125"
          />
        </div>
        <div className="overflow-hidden rounded-xl mb-5">
          <img
            src="galaxy1.jpg"
            alt=""
            className="object-cover rounded-xl transition duration-700 ease-in-out transform hover:transform hover:scale-125"
          />
        </div>
      </div>
      <div className="w-full h-full">
        <div className="overflow-hidden rounded-xl mb-5">
          <img
            src="galaxy3.jpg"
            alt=""
            className="object-cover rounded-xl transition duration-700 ease-in-out transform hover:transform hover:scale-125"
          />
        </div>
        <div className="overflow-hidden rounded-xl mb-5">
          <img
            src="galaxy6.jpg"
            alt=""
            className="object-cover rounded-xl transition duration-700 ease-in-out transform hover:transform hover:scale-125"
          />
        </div>
        <div className="overflow-hidden rounded-xl mb-5">
          <img
            src="galaxy4.jpg"
            alt=""
            className="object-cover rounded-xl transition duration-700 ease-in-out transform hover:transform hover:scale-125"
          />
        </div>
      </div>
      <div className="w-full h-full">
        <div className="overflow-hidden rounded-xl mb-5">
          <img
            src="galaxy5.jpg"
            alt=""
            className="object-cover rounded-xl transition duration-700 ease-in-out transform hover:transform hover:scale-125"
          />
        </div>
        <div className="overflow-hidden rounded-xl mb-5">
          <img
            src="galaxy2.jpg"
            alt=""
            className="object-cover rounded-xl transition duration-700 ease-in-out transform hover:transform hover:scale-125"
          />
        </div>
        <div className="overflow-hidden rounded-xl mb-5">
          <img
            src="galaxy3.jpg"
            alt=""
            className="object-cover rounded-xl transition duration-700 ease-in-out transform hover:transform hover:scale-125"
          />
        </div>
      </div>
      <div className="w-full h-full">
        <div className="overflow-hidden rounded-xl mb-5">
          <img
            src="galaxy3.jpg"
            alt=""
            className="object-cover rounded-xl transition duration-700 ease-in-out transform hover:transform hover:scale-125"
          />
        </div>
        <div className="overflow-hidden rounded-xl mb-5">
          <img
            src="galaxy6.jpg"
            alt=""
            className="object-cover rounded-xl transition duration-700 ease-in-out transform hover:transform hover:scale-125"
          />
        </div>
        <div className="overflow-hidden rounded-xl mb-5">
          <img
            src="galaxy4.jpg"
            alt=""
            className="object-cover rounded-xl transition duration-700 ease-in-out transform hover:transform hover:scale-125"
          />
        </div>
      </div>
    </div>
  )
}

export default ArtistsPosts
