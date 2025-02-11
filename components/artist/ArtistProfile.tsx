import { FiInstagram } from 'react-icons/fi'
import { AiFillFacebook } from 'react-icons/ai'
import { FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { RiCalendarLine } from 'react-icons/ri'
import { RiRoadMapLine } from 'react-icons/ri'
import { FiClock } from 'react-icons/fi'
import Link from 'next/link'
import { ArtistTypes } from 'types/artist'
import PostCallOptions from 'components/post/PostCallOptions'
import { useContext, useState } from 'react'
import { LoginContext } from 'pages/_app'
import ArtistsPosts from './ArtistPosts'
import { checkUrl } from 'lib/utils'
import ModalPictures from 'components/common/modal-pictures/ModalPictures'
import { BsHeart } from 'react-icons/bs'
import { agenda } from 'components/layout/header/availability'
import { useUser } from 'hooks/useUser'

type Props = {
  artistData: ArtistTypes
  artistPics: any
}

const ArtistProfile = ({ artistData, artistPics }: Props) => {
  const [openModalPics, setOpenModalPics] = useState(false)
  const { user }: any = useUser()

  const { openModal } = useContext(LoginContext)

  return (
    <>
      {openModalPics && (
        <ModalPictures
          openModal={openModalPics}
          setOpenModal={setOpenModalPics}
          pictures={artistPics}
          profilePicture={artistData?.artists_main_photos?.url || null}
        />
      )}

      <div className="min-h-screen pt-5 sm:pt-14 px-5 sm:px-10 lg:px-20 pb-20">
        <div className="flex flex-col sm:flex-row ">
          <div className="w-full sm:w-2/6 rounded-lg overflow-hidden mb-5 lg:mb-0 sm:max-w-xs">
            {/* <img
                src="https://via.placeholder.com/309x287"
                alt=""
                className="w-full"
              /> */}

            <div
              className="aspect-w-3 aspect-h-4 relative cursor-pointer"
              onClick={() => setOpenModalPics(true)}
            >
              {artistData?.artists_main_photos?.url ? (
                <img
                  className="w-full  object-cover"
                  src={
                    artistData?.artists_main_photos?.url +
                    '/tr:pr-true,c-at_max,w-400,f-auto,q-90'
                  }
                  alt={`Foto de perfil de ${artistData.name}`}
                />
              ) : (
                <img
                  src="https://via.placeholder.com/309x287"
                  alt="Sin foto de perfil"
                  className="w-full"
                />
              )}
            </div>

            <div className="relative bg-gr-800 bg-opacity-50 px-5 py-6 rounded-b-lg">
              <h1 className="text-white text-xl font-semibold font-raleway tracking-wide">
                {artistData?.name}
              </h1>
              <div className="flex items-center gap-2 mb-4 lg:mb-0">
                <h6 className="text-light-200 text-base lg:text-sm">
                  {artistData?.cities?.city_name},{' '}
                  {artistData?.cities?.province}
                </h6>
              </div>

              <div className="flex space-x-4 my-4">
                {artistData?.instagram && (
                  <a
                    href={checkUrl(
                      artistData.instagram,
                      'https://instagram.com'
                    )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="text-2xl text-light-200">
                      <FiInstagram />
                    </span>
                  </a>
                )}
                {artistData?.facebook && (
                  <a
                    href={checkUrl(artistData.facebook, 'https://facebook.com')}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="text-2xl text-light-200">
                      <AiFillFacebook />
                    </span>
                  </a>
                )}

                {artistData?.twitter && (
                  <a
                    href={checkUrl(artistData.twitter, 'https://twitter.com')}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="text-2xl text-light-200">
                      <FaTwitter />
                    </span>
                  </a>
                )}
              </div>

              <div className="mb-6">
                <div className="flex space-x-2 mt-5 mb-4">
                  <span className="text-light-500">
                    <RiCalendarLine className="text-xl" />
                  </span>
                  <p className="text-light-500 text-sm">
                    <span className="font-semibold">Disponibilidad: </span>{' '}
                    {(artistData?.availability_id &&
                      agenda[artistData?.availability_id - 1].label) ||
                      'Sin disponibilidad'}
                  </p>
                </div>

                <div className="flex space-x-2 my-2 mb-4">
                  <span className="text-light-500">
                    <Link href={`/${artistData.username}/map`}>
                      <a className="text-light-500 text-sm hover:text-gn-500 text-left">
                        <RiRoadMapLine className="text-xl" />
                      </a>
                    </Link>
                  </span>
                  <Link href={`/${artistData.username}/map`}>
                    <a className="text-light-500 text-sm hover:text-gn-500 text-left">
                      {artistData?.cities?.formatted_address || 'Sin dirección'}
                    </a>
                  </Link>
                </div>

                <div className="flex space-x-2 mb-5">
                  <span className="text-light-500">
                    <FiClock className="text-xl" />
                  </span>
                  <p className="text-light-500 text-sm">
                    {artistData?.times || 'Sin asignar'}
                  </p>
                </div>
              </div>

              {!user ? (
                <button
                  className="flex bg-gn-500 hover:bg-green-700 px-8 py-3 rounded-md font-semibold text-sm border border-gn-500 w-full justify-center text-gray-200"
                  onClick={openModal}
                >
                  CONTACTAR <FaWhatsapp className="text-xl ml-3" />
                </button>
              ) : (
                <PostCallOptions artistData={artistData} widthFull />
              )}

              {/*<button
                onClick={() => console.log('click en estrella')}
                className="absolute top-0 right-0 -mt-6 mr-5 w-12 h-12 flex justify-center items-center text-white text-2xl bg-green-600 rounded-full focus:outline-none"
              >
                <AiOutlineStar />
              </button>*/}
              <button className="bg-gr-800 ml-4 rounded-full p-2 border border-gr-600 absolute top-0 right-0 -mt-6 mr-5 ">
                <BsHeart className="text-2xl hover:text-primary text-gn-400 animate-pulse relative top-0.5" />
              </button>
            </div>
          </div>

          <div className="w-full flex flex-col ml-0 sm:ml-10">
            <div>
              <h1 className="text-white text-2xl font-semibold tracking-wide mb-4">
                Acerca de mi
              </h1>
              <p className="text-gray-400 w-full lg:w-2/3 mb-10 whitespace-pre-line">
                {artistData?.bio || 'Sin bio'}
              </p>
            </div>
            <div className="w-full flex flex-wrap gap-x-6">
              <button className="text-white flex-shrink-0">Todos</button>

              {artistData?.styles?.map((style) => (
                <button className="text-gray-300 hover:text-white" key={style}>
                  {style}
                </button>
              ))}
            </div>
            <div className="border-b-2 border-gray-500 w-full h-1 mb-5"></div>

            <ArtistsPosts artistId={artistData?.id} user={user} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ArtistProfile
