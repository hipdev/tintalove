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
import { useContext } from 'react'
import { LoginContext } from 'pages/_app'
import ArtistsPosts from './ArtistPosts'

type Props = {
  artistData: ArtistTypes
  artistPics: any
}

const loaderPost = ({ src, quality }: any) => {
  return `${src}/tr:pr-true,c-at_max,f-auto,h-320,q-${quality || 75}`
}

const ArtistProfile = ({ artistData, artistPics }: Props) => {
  console.log(artistPics, 'fotos del artista')
  console.log(artistData, 'data del artista')

  const { userId } = useUserId()
  const { data } = useSWR(userId ? userId : null, getUserInfo)

  const { openModal } = useContext(LoginContext)

  return (
    <div className=" h-auto min-h-screen">
      <div className="mx-5 sm:mx-16 pt-20">
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          <div className="hidden lg:block w-full sm:w-4/5 lg:w-80  static lg:fixed flex-shrink-0 self-center lg:self-start rounded-lg overflow-hidden mb-5 lg:mb-0">
            {/* <img
                src="https://via.placeholder.com/309x287"
                alt=""
                className="w-full"
              /> */}

            <div className="h-80 w-full relative">
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
                <Link href="#">
                  <a className="text-green-600">(ver ubicación)</a>
                </Link>
              </div>
              <div className="flex space-x-4 my-4">
                <Link href="#">
                  <a>
                    <span className="text-2xl text-light-200">
                      <FiInstagram />
                    </span>
                  </a>
                </Link>
                <Link href="#">
                  <a>
                    <span className="text-2xl text-light-200">
                      <AiFillFacebook />
                    </span>
                  </a>
                </Link>
                <Link href="#">
                  <a>
                    <span className="text-2xl text-light-200">
                      <FaTwitter />
                    </span>
                  </a>
                </Link>
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
                    <RiRoadMapLine className="text-xl" />
                  </span>
                  <p className="text-light-500 text-sm">
                    {artistData?.dataLocation?.formatted_address ||
                      'Sin dirección'}
                  </p>
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
                <PostCallOptions artistData={artistData} />
              )}

              <button className="absolute top-0 right-0 -mt-6 mr-5 w-12 h-12 flex justify-center items-center text-white text-2xl bg-green-600 rounded-full focus:outline-none">
                <span>
                  <AiOutlineStar />
                </span>
              </button>
            </div>
          </div>
          <div className="block lg:hidden w-full flex-shrink-0 self-center lg:self-start rounded-lg overflow-hidden fixed bottom-0 z-10">
            <div className="flex items-center justify-between gap-4 h-auto relative bg-dark-700 bg-opacity-70 px-5 py-6 rounded-b-lg">
              <div>
                <h1 className="text-white text-xl font-semibold font-raleway tracking-wide">
                  Daniela Castillo
                </h1>
                <div className="flex flex-wrap items-center gap-2 mb-4 lg:mb-0">
                  <h6 className="text-light-200 text-base lg:text-sm flex-shrink-0">
                    Medellín, Antioquia
                  </h6>
                  <Link href="#">
                    <a className="text-green-600 flex-shrink-0">
                      (ver ubicación)
                    </a>
                  </Link>
                </div>
                <div>
                  <div className="flex space-x-2 mb-2 lg:mb-0">
                    <p className="text-light-500 text-base lg:text-sm">
                      Disponible en 2 meses
                    </p>
                  </div>
                </div>
              </div>
              <button className="btn-primary font-light text-xs tracking-wide py-3 px-5 w-1/2 md:w-1/3 focus:outline-none h-14">
                CONTÁCTAME
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col ml-0 lg:ml-650">
            <div>
              <div className="block lg:hidden mb-10 w-full">
                <img
                  src="https://via.placeholder.com/309x287"
                  alt=""
                  className="mx-auto"
                />
              </div>
              <h1 className="text-white text-2xl font-semibold tracking-wide mb-4">
                Acerca de mi
              </h1>
              <p className="text-gray-400 w-full lg:w-2/3 mb-10">
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
    </div>
  )
}

export default ArtistProfile
