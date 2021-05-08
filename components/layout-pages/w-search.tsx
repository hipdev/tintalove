import { BsSearch } from 'react-icons/bs'
import { BsFilter } from 'react-icons/bs'
import { BsArrowRight } from 'react-icons/bs'
import { AiOutlineStar } from 'react-icons/ai'
import { FaInstagram } from 'react-icons/fa'
import { AiFillFacebook } from 'react-icons/ai'
import { AiOutlineTwitter } from 'react-icons/ai'
import { AiOutlineCalendar } from 'react-icons/ai'
import { RiMessengerLine } from 'react-icons/ri'
import { FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'

const Search = () => {
  return (
    <div className="bg-ocean_blue-900 h-auto">
      <div className="container mx-auto">
        <div className="pt-32">
          <div className="flex flex-col sm:flex-col xl:flex-row items-center justify-between mb-10">
            <div className="flex items-center mb-4 xl:mb-0">
              <input
                type="search"
                placeholder="BUSCAR..."
                className="w-64 sm:w-96 h-12 px-5 rounded-l-lg placeholder-black"
              />
              <button
                type="submit"
                className="w-14 h-12 bg-green-500 rounded-r-lg"
              >
                <span className="text-xl text-white flex justify-center">
                  <BsSearch />
                </span>
              </button>
            </div>
            <div className="flex items-center gap-2 border border-gray-300 py-3 px-4 rounded-md">
              <span className="text-gray-300 text-xl">
                <BsFilter />
              </span>
              <select
                name=""
                id=""
                className="appearance-none bg-transparent text-gray-300"
              >
                <option value="">FILTROS</option>
              </select>
            </div>
          </div>
          <div className="border-b-2 border-gray-500 mb-5 mx-5 sm:mx-0">
            <div className="flex justify-between items-center mb-1">
              <div className="flex gap-3 mb-1">
                <h1 className="text-white text-2xl font-semibold">Tatuajes</h1>
                <div className="w-8 h-8 bg-gray-500 text-white flex items-center justify-center rounded-md">
                  16
                </div>
              </div>
              <div>
                <Link href="#">
                  <a className="text-white flex items-center gap-2">
                    Ver todos
                    <span className="text-green-500 text-2xl">
                      <BsArrowRight />
                    </span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-5 mb-10 mx-5 sm:mx-0">
            <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
              <img src="" alt="" className="h-28 sm:h-32 w-full" />
            </div>
            <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
              <img src="" alt="" className="h-28 sm:h-32 w-full" />
            </div>
            <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
              <img src="" alt="" className="h-28 sm:h-32 w-full" />
            </div>
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
          <div className="border-b-2 border-gray-500 mb-5 mx-5 sm:mx-0">
            <div className="flex gap-3 mb-2">
              <h1 className="text-white text-2xl font-semibold">Artistas</h1>
              <div className="w-8 h-8 bg-gray-500 text-white flex items-center justify-center rounded-md">
                2
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5 pb-12 mx-5 sm:mx-0">
            <div className="w-full h-full bg-ocean_blue-800 p-5 rounded-md">
              <div className="flex justify-between">
                <div className="flex flex-wrap gap-5">
                  <div className="bg-black w-14 sm:w-16 h-14 sm:h-16 rounded-xl">
                    <img src="" alt="" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold text-white tracking-wide">
                      El Gato
                    </h1>
                    <p className="text-white">Medellin, Antioquia</p>
                  </div>
                </div>
                <div className="w-16 h-16  bg-light-600 rounded-full flex flex-shrink-0 items-center justify-center">
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
            <div className="w-full h-full bg-ocean_blue-800 p-5 rounded-md">
              <div className="flex justify-between">
                <div className="flex flex-wrap gap-5">
                  <div className="bg-black w-14 sm:w-16 h-14 sm:h-16 rounded-xl">
                    <img src="" alt="" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold text-white tracking-wide">
                      Gato Man
                    </h1>
                    <p className="text-white">Medellin, Antioquia</p>
                  </div>
                </div>
                <div className="w-16 h-16  bg-light-600 rounded-full flex flex-shrink-0 items-center justify-center">
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
                  <FaWhatsapp />
                </span>
                CONTÁCTAME
              </button>
            </div>
          </div>
          <div className="border-b-2 border-gray-500 mb-5 mx-5 sm:mx-0">
            <div className="flex gap-3 mb-2">
              <h1 className="text-white text-2xl font-semibold">Estudios</h1>
              <div className="w-8 h-8 bg-gray-500 text-white flex items-center justify-center rounded-md">
                1
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mx-5 sm:mx-0">
            <div className="bg-ocean_blue-800 p-5 rounded-md">
              <div className="flex flex-wrap gap-5 mb-5">
                <div className="bg-black w-14 sm:w-16 h-14 sm:h-16 rounded-xl">
                  <img src="" alt="" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-white tracking-wide">
                    El Gato Rayado
                  </h1>
                  <p className="text-white">Medellin, Antioquia</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    className="inline-block h-8 w-8 rounded-full transform hover:-translate-x-1 hover:-rotate-90 transition duration-300"
                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full transform hover:-translate-x-1 hover:-rotate-90 transition duration-300"
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full transform hover:-translate-x-1 hover:-rotate-90 transition duration-300"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                    alt=""
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full transform hover:-translate-x-1 hover:-rotate-90 transition duration-300"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <p className="text-white">4 Artistas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
