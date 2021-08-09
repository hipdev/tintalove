import { RiMessengerLine } from 'react-icons/ri'
import { FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { AiFillFacebook } from 'react-icons/ai'
import StudioCard from './StudioCard'
import { StudioTypes } from 'types/studio'
import { checkUrl } from 'lib/utils'
import { useContext, useState } from 'react'
import { LoginContext } from 'pages/_app'
import PostCallOptions from 'components/post/PostCallOptions'
import useUserId from 'hooks/use-user-id'
import useSWR from 'swr'
import { getUserInfo } from 'lib/queries/users'
import ModalPictures from 'components/common/modal-pictures/ModalPictures'
import ArtistsCards from './ArtistsCards'

type Props = {
  studioData: StudioTypes
  studioPictures: any
}

const ProfileStudio = ({ studioData, studioPictures }: Props) => {
  console.log(studioData, 'data del estudio')

  const [openModalPics, setOpenModalPics] = useState(false)

  const { openModal } = useContext(LoginContext)
  const { userId } = useUserId()
  const { data } = useSWR(userId ? userId : null, getUserInfo)

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
          profilePicture={studioData?.profile_picture?.url || null}
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
            {studioData?.profile_picture?.url && (
              <img
                src={`${studioData?.profile_picture?.url}/tr:pr-true,w-48,h-48,q-90`}
                alt="User photo"
                className="w-14 h-14 object-cover rounded-md"
              />
            )}
            <div>
              <h1 className="text-white text-2xl font-semibold tracking-wide">
                {studioData?.studio_name || 'Sin nombre'}
              </h1>
              <p className="text-gray-400">
                {studioData?.dataLocation?.formatted_address || 'Sin dirección'}
              </p>
            </div>
          </div>

          {!data?.user ? (
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
            <h1 className="font-semibold mb-2 tracking-wide">Horarios</h1>
            <p className="text-gray-400">
              {studioData?.times || 'Sin horarios'}
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
          <h1 className="text-white font-semibold mb-10">
            Artistas del estudio
          </h1>
          {studioData?.artists?.length > 0 ? (
            <ArtistsCards artists={studioData?.artists || []} />
          ) : (
            <p className="text-gray-400">
              Este estudio no tiene artistas vinculados
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileStudio
