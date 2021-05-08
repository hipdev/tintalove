import { BsSearch } from 'react-icons/bs'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { AiOutlineStar } from 'react-icons/ai'
import { FaInstagram } from 'react-icons/fa'
import { AiFillFacebook } from 'react-icons/ai'
import { AiOutlineTwitter } from 'react-icons/ai'
import { AiOutlineCalendar } from 'react-icons/ai'
import { RiMessengerLine } from 'react-icons/ri'
import { FaWhatsapp } from 'react-icons/fa'
import { HiOutlinePhoneOutgoing } from 'react-icons/hi'

const Card2Artist = () => {
  return (
    <div className="w-full h-full bg-ocean_blue-800 p-5 rounded-md">
      <div className="flex justify-between">
        <div className="flex flex-wrap gap-5">
          <div className="bg-black w-14  h-14  rounded-xl">
            <img src="" alt="" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-wide">
              Daniela Castillo
            </h1>
            <p className="text-white">Medellin, Antioquia</p>
          </div>
        </div>
        <div className="w-14 h-14  bg-light-600 rounded-full flex flex-shrink-0 items-center justify-center">
          <span className="text-white text-2xl">
            <AiOutlineStar />
          </span>
        </div>
      </div>
      <p className="text-white my-4">Estilos: Color, Sombras</p>
      <div className="flex gap-4 mb-5">
        <span className="text-2xl text-white">
          <FaInstagram />
        </span>
        <span className="text-2xl text-white">
          <AiFillFacebook />
        </span>
        <span className="text-2xl text-white">
          <AiOutlineTwitter />
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 lg:gap-2 mb-4 mx-0 sm:mx-10 lg:mx-0">
        <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
          <img src="" alt="" className="h-28 sm:h-32 w-full" />
        </div>
        <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
          <img src="" alt="" className="h-28 sm:h-32 w-full" />
        </div>
        <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden hidden sm:block">
          <img src="" alt="" className="h-28 sm:h-32 w-full" />
        </div>
      </div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-white">
          <AiOutlineCalendar />
        </span>
        <p className="text-white">Disponible en 2 meses</p>
      </div>
      <button className="bg-green-500 text-white text-sm py-3 w-full rounded-md flex items-center justify-center gap-2 focus:outline-none">
        <span className="text-2xl">
          <RiMessengerLine />
        </span>
        CONTÁCTAME
      </button>
    </div>
  )
}

export default Card2Artist
