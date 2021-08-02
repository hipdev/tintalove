import { FiInstagram } from 'react-icons/fi'
import { AiFillFacebook } from 'react-icons/ai'
import { FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { RiCalendarLine } from 'react-icons/ri'
import { RiRoadMapLine } from 'react-icons/ri'
import { FiClock } from 'react-icons/fi'
import { AiOutlineStar } from 'react-icons/ai'
import Link from 'next/link'
import { ArtistTypes } from 'types/artist'
import Image from 'next/image'
import PostCallOptions from 'components/post/PostCallOptions'
import useUserId from 'hooks/use-user-id'
import useSWR from 'swr'
import { getUserInfo } from 'lib/queries/users'
import { useContext, useState } from 'react'
import { LoginContext } from 'pages/_app'
import ArtistsPosts from './ArtistPosts'
import { checkUrl } from 'lib/utils'
import ModalPictures from 'components/common/modal-pictures/ModalPictures'

type Props = {
  artistData: ArtistTypes
  artistPics: any
}

const loaderPost = ({ src, quality }: any) => {
  return `${src}/tr:pr-true,c-at_max,f-auto,h-320,q-${quality || 75}`
}

const ArtistProfile = ({ artistData, artistPics }: Props) => {
  console.log(artistData, 'data del artista')

  const [openModalPics, setOpenModalPics] = useState(false)

  const { userId } = useUserId()
  const { data } = useSWR(userId ? userId : null, getUserInfo)

  const { openModal } = useContext(LoginContext)

  return (
    <>
      {openModalPics && (
        <ModalPictures
          openModal={openModalPics}
          setOpenModal={setOpenModalPics}
          pictures={artistPics}
          profilePicture={artistData?.profile_picture?.url || null}
        />
      )}

      <div className="min-h-screen pt-5 sm:pt-20 px-5 sm:px-10 lg:px-20 pb-20">
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
              {artistData?.profile_picture?.url ? (
                <Image
                  loader={loaderPost}
                  src={artistData?.profile_picture?.url}
                  alt={`Foto de perfil de ${artistData.displayName}`}
                  layout="fill" // el fill obliga a que se adapte al padre
                  // width={600}
                  // height={500}
                  // sizes="100%"
                  loading="lazy"
                  quality={100}
                  className="w-full  object-cover"
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
                {artistData?.displayName}
              </h1>
              <div className="flex items-center gap-2 mb-4 lg:mb-0">
                <h6 className="text-light-200 text-base lg:text-sm">
                  {artistData?.city_name}, {artistData?.province}
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
                    {artistData?.available_label || 'Sin disponibilidad'}
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
                      {artistData?.dataLocation?.formatted_address ||
                        'Sin dirección'}
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

              {!data?.user ? (
                <button
                  className="flex bg-gn-500 hover:bg-green-700 px-8 py-3 rounded-md font-semibold text-sm border border-gn-500 w-full justify-center text-gray-200"
                  onClick={openModal}
                >
                  CONTACTAR <FaWhatsapp className="text-xl ml-3" />
                </button>
              ) : (
                <PostCallOptions artistData={artistData} widthFull />
              )}

              <button
                onClick={() => console.log('click en estrella')}
                className="absolute top-0 right-0 -mt-6 mr-5 w-12 h-12 flex justify-center items-center text-white text-2xl bg-green-600 rounded-full focus:outline-none"
              >
                <AiOutlineStar />
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

            <ArtistsPosts artistId={artistData?.artist_id} user={data?.user} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ArtistProfile
