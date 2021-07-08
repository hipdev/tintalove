import { AiOutlineStar } from 'react-icons/ai'
import { RiMessengerLine } from 'react-icons/ri'
import { FaInstagram } from 'react-icons/fa'
import { AiFillFacebook } from 'react-icons/ai'
import StudioCard from './StudioCard'
import { StudioTypes } from 'types/studio'
import Link from 'next/link'

const ProfileStudio = ({ studioData }) => {
  return (
    <div className="bg-dark-500 h-auto px-5 sm:px-0">
      <div className="container mx-auto pt-32">
        <div className="w-full bg-ocean_blue-200 flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between p-5 rounded-lg mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex flex-shrink-0 w-14 h-14 bg-blue-500 rounded-lg"></div>
            <div>
              <h1 className="text-white text-2xl font-semibold tracking-wide">
                Commun Studio
              </h1>
              <p className="text-white">
                Calle 10 B Sur #10 B 10, Medellín, Antioquia
              </p>
            </div>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-items-start items-center gap-3">
            <button className="text-white flex items-center gap-2 bg-light-600 py-4 px-10 rounded-lg focus:outline-none">
              <span className="text-2xl">
                <AiOutlineStar />
              </span>
              FAVORITOS
            </button>
            <button className="text-white flex items-center gap-2 bg-green-500 py-4 px-10 rounded-lg focus:outline-none">
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
            <p className="text-gray-400">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat
              libero veniam error facere maiores repellendus voluptatum illum,
              ipsam iure numquam necessitatibus dolor expedita, vero vel.
            </p>
          </div>
          <div className="text-white mb-5 sm:mb-0 w-full sm:w-1/3">
            <h1 className="font-semibold mb-2 tracking-wide">Horarios</h1>
            <p className="text-gray-400">Lunes a Viernes, de 10am - 7pm</p>
            <p className="text-gray-400">Sábados, Domingos y Festivos </p>
            <p className="text-gray-400">10:00am 1:00pm</p>
          </div>
          <div className="">
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileStudio
