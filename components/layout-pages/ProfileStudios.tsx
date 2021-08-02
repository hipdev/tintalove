import { AiOutlineStar } from 'react-icons/ai'
import { RiMessengerLine } from 'react-icons/ri'
import { FaInstagram } from 'react-icons/fa'
import { AiFillFacebook } from 'react-icons/ai'
import StudioCard from './StudioCard'
import { StudioTypes } from 'types/studio'
import Link from 'next/link'

type Props = {
  studioData: StudioTypes
  studioPictures: any
}

const ProfileStudio = ({ studioData, studioPictures }: Props) => {
  console.log(studioData, 'data del estudio')
  console.log(studioPictures, 'fotos del estudio')

  return (
    <div className="bg-dark-800 h-auto px-5 sm:px-0">
      {studioPictures && (
        <div className="flex overflow-hidden max-h-80">
          {studioPictures.map((pic) => {
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
          })}
        </div>
      )}
      <div className=" py-4 md:py-3 px-5 sm:px-10 lg:px-20 container mx-auto pt-0 relative -top-10">
        <div className="w-full bg-gr-800 flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between p-5 rounded-lg mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex flex-shrink-0 w-14 h-14 bg-blue-500 rounded-lg"></div>
            <div>
              <h1 className="text-white text-2xl font-semibold tracking-wide">
                {studioData?.studio_name || 'Sin nombre'}
              </h1>
              <p className="text-gray-300">
                {studioData?.dataLocation.formatted_address || 'Sin dirección'}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-items-start items-center gap-3">
            <button className="text-white flex items-center gap-2 bg-primary hover:bg-primaryHover py-3 px-7 rounded-lg focus:outline-none text-sm ">
              <span className="text-2xl">
                <RiMessengerLine />
              </span>
              CONTÁCTANOS
            </button>
          </div>
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
              <Link href="#">
                <a className="text-gray-400 text-2xl">
                  <FaInstagram />
                </a>
              </Link>
              <Link href="#">
                <a className="text-gray-400 text-2xl">
                  <AiFillFacebook />
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-white font-semibold mb-10">
            Artistas del estudio
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <StudioCard studios={studioData} />
            <StudioCard studios={studioData} />
            <StudioCard studios={studioData} />
            <StudioCard studios={studioData} />
            <StudioCard studios={studioData} />
            <StudioCard studios={studioData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileStudio
