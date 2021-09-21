import Link from 'next/link'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa'
import { IoIosArrowUp } from 'react-icons/io'
import { ArtistTypes } from 'types/artist'
import { UserState } from 'types/user'
import { useContext } from 'react'
import { LoginContext } from 'pages/_app'
import PostCallOptions from './PostCallOptions'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import PostArtistFavorite from './PostArtistFavorite'

const loaderImage = ({ src, quality }: any) => {
  return `${src}/tr:pr-true,w-48,h-48,q-${quality || 75}`
}

const PostBottomFixed = ({
  overlayRef,
  user,
  showUp,
}: {
  overlayRef: any
  user: UserState
  showUp: boolean
}) => {
  const { isOpen, setIsOpen, openModal } = useContext(LoginContext)

  const artistData = null

  const goTop = () => {
    overlayRef.current.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-0 z-20 w-full bg-gr-700 left-0 text-gray-300 py-4 border-t border-gray-700 px-5  sm:w-full sm:px-10 2xl:px-16">
      <div
        className={
          'transition-opacity ' + (showUp ? 'opacity-100' : 'opacity-0')
        }
      >
        <button
          className="absolute -top-20 right-5 ml-4 flex items-center text-white focus:outline-none"
          onClick={goTop}
        >
          <span className="text-xl rounded-full bg-gr-800 hover:bg-gr-900 p-3 border border-gr-600">
            <IoIosArrowUp />
          </span>
        </button>
      </div>

      <div className="flex justify-between 2xl:justify-around">
        <div className="flex items-center sm:hidden">
          <Link href={`/${artistData?.username}`}>
            <a className="text-white font-semibold text-sm ">
              {artistData?.displayName} <br />
              <span className="text-gray-400 font-light">
                {artistData?.username}
              </span>
            </a>
          </Link>
        </div>
        <div className=" items-center  hidden sm:flex">
          <div className="flex">
            <Link href={`/${artistData?.username}`}>
              <a className="text-gn-500 ml-2 w-12 mr-3">
                <Image
                  loader={loaderImage}
                  src={artistData?.profile_picture.url}
                  alt="Artist photo"
                  width={48}
                  height={48}
                  sizes="100%"
                  quality={100}
                  className="w-full rounded-md  object-cover"
                />
              </a>
            </Link>
            <div className="leading-tight hidden sm:flex items-center ">
              <div>
                <div className="flex items-center">
                  <Link href={`/${artistData?.username}`}>
                    <a className="text-white font-semibold text-xl ">
                      {artistData?.displayName}
                    </a>
                  </Link>
                </div>

                <h2 className="text-sm text-gray-400">
                  {artistData?.city_name}, {artistData?.province}
                </h2>
              </div>

              <PostArtistFavorite user={user} artistData={artistData} />
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="text-right mr-5 hidden sm:block">
            <h3 className="text-gray-400 w-48">CITAS DISPONIBLES EN</h3>
            <span className="font-semibold">{artistData?.available_label}</span>
          </div>

          {!user ? (
            <button
              className="flex bg-gn-500 hover:bg-green-700 px-8 py-3 rounded-md font-semibold text-sm border border-gn-500"
              onClick={openModal}
            >
              CONTACTAR <FaWhatsapp className="text-xl ml-3" />
            </button>
          ) : (
            <PostCallOptions artistData={artistData} />
          )}
        </div>
      </div>
    </div>
  )
}

export default PostBottomFixed
