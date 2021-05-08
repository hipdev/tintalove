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

const ArtistLayout = () => {
  return (
    <div className="bg-dark-500 h-auto">
      <div className="container mx-auto pt-32">
        <div className="flex flex-col sm:flex-col xl:flex-row items-center justify-between mb-10">
          <div className="flex items-center mb-4 xl:mb-0">
            <input
              type="search"
              placeholder="BUSCAR..."
              className="w-64 sm:w-96 h-12 px-5 rounded-l-lg placeholder-black"
            />
            <button
              type="submit"
              className="w-14 h-12 bg-green-500 rounded-r-lg focus:outline-none"
            >
              <span className="text-xl text-white flex justify-center">
                <BsSearch />
              </span>
            </button>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 border border-gray-400 p-3 rounded-md">
              <span className="text-2xl text-gray-300">
                <MdKeyboardArrowDown />
              </span>
              <select
                name=""
                id=""
                className="appearance-none bg-transparent text-gray-300"
              >
                <option value="">ORDENAR POR</option>
              </select>
            </div>
            <div className="flex items-center gap-2 border border-gray-400 p-3 rounded-md">
              <span className="text-2xl text-gray-300">
                <MdKeyboardArrowDown />
              </span>
              <select
                name=""
                id=""
                className="appearance-none bg-transparent text-gray-300"
              >
                <option value="">ESTILOS</option>
              </select>
            </div>
          </div>
        </div>
        <section className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5 pb-5 mx-5 sm:mx-0">
          <div className="w-full h-full bg-gray-500 p-5 rounded-md">
            <div className="flex justify-between">
              <div className="flex flex-wrap gap-5">
                <div className="bg-black w-14 sm:w-16 h-14 sm:h-16 rounded-xl">
                  <img src="" alt="" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-white tracking-wide">
                    Daniela Castillo
                  </h1>
                  <p className="text-white">Medellin, Antioquia</p>
                </div>
              </div>
              <div className="w-16 h-16  bg-blue-500 rounded-full flex flex-shrink-0 items-center justify-center">
                <span className="text-white text-3xl">
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
            <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-2 mb-4 mx-0 sm:mx-10 lg:mx-0">
              <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
                <img src="" alt="" className="h-28 sm:h-32 w-full" />
              </div>
              <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
                <img src="" alt="" className="h-28 sm:h-32 w-full" />
              </div>
              <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
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
          <div className="w-full h-full bg-gray-500 p-5 rounded-md">
            <div className="flex justify-between">
              <div className="flex flex-wrap gap-5">
                <div className="bg-black w-14 sm:w-16 h-14 sm:h-16 rounded-xl">
                  <img src="" alt="" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-white tracking-wide">
                    Daniel Ramirez
                  </h1>
                  <p className="text-white">Medellin, Antioquia</p>
                </div>
              </div>
              <div className="w-16 h-16  bg-blue-500 rounded-full flex flex-shrink-0 items-center justify-center">
                <span className="text-white text-3xl">
                  <AiOutlineStar />
                </span>
              </div>
            </div>
            <p className="text-white my-4">Estilos: Puntillismo, Realismo</p>
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
            <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-2 mb-4 mx-0 sm:mx-10 lg:mx-0">
              <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
                <img src="" alt="" className="h-28 sm:h-32 w-full" />
              </div>
              <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
                <img src="" alt="" className="h-28 sm:h-32 w-full" />
              </div>
              <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
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
                <FaWhatsapp />
              </span>
              CONTÁCTAME
            </button>
          </div>
          <div className="w-full h-full bg-gray-500 p-5 rounded-md">
            <div className="flex justify-between">
              <div className="flex flex-wrap gap-5">
                <div className="bg-black w-14 sm:w-16 h-14 sm:h-16 rounded-xl">
                  <img src="" alt="" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-white tracking-wide">
                    Darwin Álvarez
                  </h1>
                  <p className="text-white">Medellin, Antioquia</p>
                </div>
              </div>
              <div className="w-16 h-16  bg-blue-500 rounded-full flex flex-shrink-0 items-center justify-center">
                <span className="text-white text-3xl">
                  <AiOutlineStar />
                </span>
              </div>
            </div>
            <p className="text-white my-4">
              Estilos: Puntillismo, Color, Sombra (3+)
            </p>
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
            <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-2 mb-4 mx-0 sm:mx-10 lg:mx-0">
              <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
                <img src="" alt="" className="h-28 sm:h-32 w-full" />
              </div>
              <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
                <img src="" alt="" className="h-28 sm:h-32 w-full" />
              </div>
              <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
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
                <HiOutlinePhoneOutgoing />
              </span>
              CONTÁCTAME
            </button>
          </div>
        </section>
        <section className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5 pb-12 mx-5 sm:mx-0">
          <div className="w-full h-full bg-gray-500 p-5 rounded-md">
            <div className="flex justify-between mb-8">
              <div className="flex flex-wrap gap-5">
                <div className="bg-black w-14 sm:w-16 h-14 sm:h-16 rounded-xl">
                  <img src="" alt="" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-white tracking-wide">
                    Sebastian Rodri...
                  </h1>
                  <p className="text-white">Medellin, Antioquia</p>
                </div>
              </div>
              <div className="w-16 h-16 bg-blue-500 rounded-full flex flex-shrink-0 items-center justify-center">
                <span className="text-white text-3xl">
                  <AiOutlineStar />
                </span>
              </div>
            </div>
            <div className="flex gap-4 mb-5 justify-between">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-green-500 text-xl">
                  <AiOutlineCalendar />
                </span>
                <p className="text-white">Disponible en 2 meses</p>
              </div>
              <div className="flex gap-4">
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
            </div>
            <p className="text-white my-4 truncate">
              Estilos: Puntillismo, Realismo, Color, Sombras (10+)
            </p>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-2 mb-4 mx-0 sm:mx-10 lg:mx-0">
              <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
                <img src="" alt="" className="h-28 sm:h-32 w-full" />
              </div>
              <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
                <img src="" alt="" className="h-28 sm:h-32 w-full" />
              </div>
              <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
                <img src="" alt="" className="h-28 sm:h-32 w-full" />
              </div>
            </div>
          </div>
          <div className="w-full h-full bg-gray-500 p-5 rounded-md">
            <div className="flex justify-between mb-8">
              <div className="flex flex-wrap gap-5">
                <div className="bg-black w-14 sm:w-16 h-14 sm:h-16 rounded-xl">
                  <img src="" alt="" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-white tracking-wide">
                    Mariano Palacio
                  </h1>
                  <p className="text-white">Medellin, Antioquia</p>
                </div>
              </div>
              <div className="w-16 h-16  bg-blue-500 rounded-full flex flex-shrink-0 items-center justify-center">
                <span className="text-white text-3xl">
                  <AiOutlineStar />
                </span>
              </div>
            </div>
            <div className="flex gap-4 mb-5 justify-between">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-green-500 text-xl">
                  <AiOutlineCalendar />
                </span>
                <p className="text-white">Disponible en 2 meses</p>
              </div>
              <div className="flex gap-4">
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
            </div>
            <p className="text-white my-4">Estilos: Color, Sombras</p>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-2 mb-4 mx-0 sm:mx-10 lg:mx-0">
              <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
                <img src="" alt="" className="h-28 sm:h-32 w-full" />
              </div>
              <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
                <img src="" alt="" className="h-28 sm:h-32 w-full" />
              </div>
              <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
                <img src="" alt="" className="h-28 sm:h-32 w-full" />
              </div>
            </div>
          </div>
          <div className="w-full h-full bg-gray-500 p-5 rounded-md">
            <div className="flex justify-between mb-8">
              <div className="flex flex-wrap gap-5">
                <div className="bg-black w-14 sm:w-16 h-14 sm:h-16 rounded-xl">
                  <img src="" alt="" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-white tracking-wide">
                    Fernando Torres
                  </h1>
                  <p className="text-white">Medellin, Antioquia</p>
                </div>
              </div>
              <div className="w-16 h-16  bg-blue-500 rounded-full flex flex-shrink-0 items-center justify-center">
                <span className="text-white text-3xl">
                  <AiOutlineStar />
                </span>
              </div>
            </div>
            <div className="flex gap-4 mb-5 justify-between">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-green-500 text-xl">
                  <AiOutlineCalendar />
                </span>
                <p className="text-white">Disponible en 2 meses</p>
              </div>
              <div className="flex gap-4">
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
            </div>
            <p className="text-white my-4">Estilos: Puntillismo, Realismo</p>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-2 mb-4 mx-0 sm:mx-10 lg:mx-0">
              <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
                <img src="" alt="" className="h-28 sm:h-32 w-full" />
              </div>
              <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
                <img src="" alt="" className="h-28 sm:h-32 w-full" />
              </div>
              <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
                <img src="" alt="" className="h-28 sm:h-32 w-full" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ArtistLayout
