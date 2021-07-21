import Link from 'next/link'
import Image from 'next/image'

import { FaWhatsapp } from 'react-icons/fa'
import { IoIosArrowUp } from 'react-icons/io'
import { ArtistTypes } from 'types/artist'
import { AiOutlineStar } from 'react-icons/ai'

const loaderImage = ({ src, quality }: any) => {
  return `${src}/tr:pr-true,w-48,h-48,q-${quality || 75}`
}

const PostBottomFixed = ({
  artistData,
  overlayRef,
}: {
  artistData: ArtistTypes
  overlayRef: any
}) => {
  const goTop = () => {
    overlayRef.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <div className="fixed bottom-0 z-20 w-full bg-gr-700 left-0 text-gray-300 py-4 px-16 border-t border-gray-700">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="flex">
              <Link href={`/${artistData.username}`}>
                <a className="text-gn-500 ml-2 w-12 mr-3">
                  <Image
                    loader={loaderImage}
                    src={artistData.profile_picture.url}
                    alt="Artist photo"
                    width={48}
                    height={48}
                    sizes="100%"
                    quality={100}
                    className="w-full rounded-md  object-cover"
                  />
                </a>
              </Link>
              <div className="leading-tight">
                <Link href={`/${artistData.username}`}>
                  <a className="text-white font-semibold text-xl ">
                    {artistData.displayName}
                  </a>
                </Link>
                <h2 className="text-sm text-gray-400">
                  {artistData.city_name}, {artistData.province}{' '}
                </h2>
              </div>
            </div>
            <button className="flex items-center px-7 border border-gn-500 rounded-md py-3 ml-5 text-sm">
              AÑADIR A FAVORITOS <AiOutlineStar className="ml-2 text-xl" />
            </button>
          </div>

          <div className="flex items-center">
            <div className="text-right mr-5">
              <h3 className="text-gray-400">CITAS DISPONIBLES EN</h3>
              <span className="font-semibold">
                {artistData.available_label}
              </span>
            </div>
            <button className="flex bg-gn-500 hover:bg-green-700 px-8 py-3 rounded-md font-semibold text-sm border border-gn-500">
              CONTACTAR <FaWhatsapp className="text-xl ml-3" />
            </button>

            <button
              className="ml-4 flex items-center text-white focus:outline-none"
              onClick={goTop}
            >
              <span className="text-2xl rounded-full bg-gr-800 hover:bg-gr-900 p-3 border border-gr-600">
                <IoIosArrowUp />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostBottomFixed
