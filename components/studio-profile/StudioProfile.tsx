import { GoogleMap, Marker } from '@react-google-maps/api'
import { FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { AiFillFacebook } from 'react-icons/ai'
import { StudioTypes } from 'types/studio'
import { checkUrl } from 'lib/utils'
import { useContext, useState } from 'react'
import { LoginContext } from 'pages/_app'
import PostCallOptions from 'components/post/PostCallOptions'
import ModalPictures from 'components/common/modal-pictures/ModalPictures'
import ArtistsCard from './ArtistsCard'
import { SiWaze } from 'react-icons/si'
import Image from 'next/image'
import { useUser } from 'hooks/useUser'
import useSWR from 'swr'
import { getArtistsByStudio } from 'lib/queries/studios'

type Props = {
  studioData: StudioTypes
  studioPictures: any
}

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '4px',
}

const ProfileStudio = ({ studioData, studioPictures }: Props) => {
  const [openModalPics, setOpenModalPics] = useState(false)

  const { openModal } = useContext(LoginContext)
  const { user } = useUser()

  const { data: artists } = useSWR(
    ['getArtistsByStudio', studioData.id],
    getArtistsByStudio
  )

  console.log(artists, 'los artistas')

  if (!studioData?.is_active) {
    return (
      <div className="bg-dark-800 h-screen">
        <p className="text-gray-300 font-bold text-4xl text-center pt-12">
          Este estudio no esta activo
        </p>
      </div>
    )
  }
  const hasPictures = studioPictures.length > 0

  return (
    <div className="bg-dark-800 h-auto px-5 sm:px-0">
      {openModalPics && (
        <ModalPictures
          openModal={openModalPics}
          setOpenModal={setOpenModalPics}
          pictures={studioPictures}
          profilePicture={studioData?.studios_main_photos?.url || null}
        />
      )}

      {hasPictures && (
        <div
          className="flex overflow-hidden max-h-80 cursor-pointer"
          onClick={() => setOpenModalPics(true)}
        >
          {studioPictures.map((pic, index) => {
            if (index < 3) {
              return (
                <div
                  className="aspect-w-6 aspect-h-4 relative w-full"
                  key={pic.id}
                >
                  <img
                    src={`${pic.url}`}
                    className="w-full object-cover  max-h-80"
                  />
                </div>
              )
            }
          })}
        </div>
      )}
      <div
        className={
          'py-4 md:py-3 px-5 sm:px-10 lg:px-20 container mx-auto pt-0 relative -top-10 ' +
          (!hasPictures ? 'top-7 sm:top-10' : '')
        }
      >
        <div className="w-full bg-gr-800 flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between p-5 pb-3 rounded-lg mb-8">
          <div className="flex items-center gap-2 mb-2">
            {studioData?.studios_main_photos?.url && (
              <img
                src={`${studioData?.studios_main_photos?.url}/tr:pr-true,w-48,h-48,q-90`}
                alt="User photo"
                className="w-14 h-14 object-cover rounded-md"
              />
            )}
            <div>
              <h1 className="text-white text-2xl font-semibold tracking-wide">
                {studioData?.name || 'Sin nombre'}
              </h1>
              <p className="text-gray-400">
                {studioData?.studios_places?.formatted_address ||
                  'Sin dirección'}
              </p>
            </div>
          </div>

          {!user ? (
            <button
              className="flex bg-gn-500 hover:bg-green-700 px-8 py-3 rounded-md font-semibold text-sm border border-gn-500 justify-center text-gray-200"
              onClick={openModal}
            >
              CONTACTAR <FaWhatsapp className="text-xl ml-3" />
            </button>
          ) : (
            <PostCallOptions artistData={studioData} />
          )}
        </div>
        <div className="w-full flex flex-wrap justify-between mb-10">
          <div className="text-white w-full sm:w-1/3 xl:w-2/5 mb-5 sm:mb-0">
            <h1 className="font-semibold mb-2 tracking-wide">Biografia</h1>
            <p className="text-gray-400">{studioData?.bio || 'Sin bio'}</p>
          </div>
          <div className="text-white mb-5 sm:mb-0 w-full sm:w-1/3">
            <h1 className="font-semibold mb-2 tracking-wide">Estilos</h1>
            <p className="text-gray-400">
              {studioData?.styles.join(', ') || 'Sin estilos registrados'}
            </p>
          </div>
          <div className="mr-4">
            <h1 className="text-white font-semibold mb-2 tracking-wide">
              Redes Sociales
            </h1>
            <div className="flex items-center gap-2">
              {studioData.instagram && (
                <a
                  href={checkUrl(studioData.instagram, 'https://instagram.com')}
                  className="text-gray-400 text-2xl"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaInstagram />
                </a>
              )}

              {studioData.facebook && (
                <a
                  href={checkUrl(studioData.facebook, 'https://facebook.com')}
                  className="text-gray-400 text-2xl"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillFacebook />
                </a>
              )}

              {studioData.twitter && (
                <a
                  href={checkUrl(studioData.twitter, 'https://twitter.com')}
                  className="text-gray-400 text-2xl"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaTwitter />
                </a>
              )}
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-gray-300 font-semibold mb-7 text-xl">
            Artistas del estudio
          </h1>
          {artists?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {artists.map((artist) => (
                <ArtistsCard key={artist.id} artist={artist.artists || ''} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">
              Este estudio no tiene artistas vinculados
            </p>
          )}
        </div>

        <div className="relative w-full rounded-md  pb-10 mt-10">
          <h1 className="mt-5 text-gray-300 text-xl font-semibold mb-4">
            Ubicación de {studioData?.name}
          </h1>
          <div className="text-gray-400 mb-8 flex justify-between">
            <div className="mr-2">
              <p className="text-sm sm:text-md">
                <span className="hidden sm:inline-block font-semibold mr-2">
                  Dirección:
                </span>
                {studioData?.studios_places?.formatted_address ||
                  'Sin dirección'}
              </p>
              <p className="text-sm sm:text-md ">
                <span className="hidden sm:inline-block font-semibold mr-2">
                  Horarios:
                </span>
                {studioData?.times}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 items-center">
              <a
                href={`https://www.waze.com/ul?ll=${
                  studioData?.main_address_marker[0] ||
                  studioData?.studios_places?.lat
                },${
                  studioData?.main_address_marker[1] ||
                  studioData?.studios_places.lng
                }&navigate=yes&zoom=10`}
                target="_blank"
                rel="noreferrer"
                style={{ backgroundColor: '#33ccff' }}
                className=" flex px-2 sm:px-3 py-2 text-black rounded-full sm:rounded-md font-semibold items-center min-w-max sm:mr-2"
              >
                <span className="hidden sm:inline-block mr-2">
                  Abrir con Waze
                </span>
                <SiWaze className="w-7 h-7 text-gray-700" />
              </a>
              <a
                href={`https://maps.google.com/?q=${
                  studioData?.main_address_marker[0] ||
                  studioData?.studios_places?.lat
                },${
                  studioData?.main_address_marker[1] ||
                  studioData?.studios_places.lng
                }`}
                target="_blank"
                rel="noreferrer"
                className=" flex px-2 sm:px-2 py-2 text-gr-700 bg-gray-200 rounded-full sm:rounded-md font-semibold items-center justify-center min-w-max "
              >
                <span className="hidden sm:inline-block ">Abrir con Maps</span>
                <Image
                  src="/maps-icon.png"
                  alt="Google maps Icon"
                  width={28}
                  height={28}
                />
              </a>
            </div>
          </div>
          <div className="h-448 sm:h-560 mb-20 bg-black ">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{
                lat:
                  studioData?.main_address_marker[0] ||
                  studioData?.studios_places?.lat,
                lng:
                  studioData?.main_address_marker[1] ||
                  studioData?.studios_places.lng,
              }}
              zoom={18}
              options={{
                streetViewControl: false,
                mapTypeControl: false,
              }}
            >
              <Marker
                position={{
                  lat:
                    studioData?.main_address_marker[0] ||
                    studioData?.studios_places?.lat,
                  lng:
                    studioData?.main_address_marker[1] ||
                    studioData?.studios_places.lng,
                }}
                icon={{
                  url: '/icon-black.png',
                }}
                label={{
                  text: studioData?.name,
                  color: '#030308',
                  fontSize: '1.4rem',
                  fontWeight: '900',
                  className: 'marker-position',
                }}
              />
            </GoogleMap>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileStudio
