import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineMenu } from 'react-icons/ai'
import {
  BsArrowRight,
  BsArrowUp,
  BsSearch,
  BsTablet,
  BsTabletLandscape,
} from 'react-icons/bs'
import { FiCalendar } from 'react-icons/fi'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { TiLocationOutline } from 'react-icons/ti'
import { CgDice1 } from 'react-icons/cg'

const PostArtist = () => {
  return (
    <div className="bg-dark-800 h-screen px-4 sm:px-16 lg:px-28 overflow-auto">
      <nav className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-8 h-20">
          <Link href="/">
            <a>
              {/* <img className="w-52" src="/short-logo.png" /> */}
              <div className="w-40 relative h-9 mt-2">
                <Image
                  // layout="fill"
                  width={180}
                  height={35}
                  src="/short-logo.png"
                  alt="Picture of the author"
                />
              </div>
            </a>
          </Link>
          <span className="text-white text-3xl">
            <AiOutlineMenu />
          </span>
          <div className="w-1/3 flex items-center gap-3">
            <span className="text-white text-xl">
              <BsSearch />
            </span>
            <input
              type="text"
              placeholder="BUSCAR"
              className="placeholder-white text-white bg-transparent w-1/3 truncate bg-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2 ml- md:ml-6 lg:ml-0">
            <span className="text-3xl text-white">
              <TiLocationOutline />
            </span>
            <select
              name=""
              id=""
              className="bg-transparent text-white font-light font-raleway focus:outline-none"
            >
              <option value="">TODO COLOMBIA</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 ml-2">
          <div>
            <div className="flex items-center gap-2 bg-ocean_blue-300 px-2 py-1 rounded-md">
              <span className="text-green-500 text-2xl">
                <FiCalendar />
              </span>
              <div className="leading-tight">
                <p className="text-white">Disponibilidad</p>
                <p className="text-light-200">En 2 meses</p>
              </div>
              <span className="text-white text-2xl">
                <MdKeyboardArrowDown />
              </span>
            </div>
          </div>
          <button className="text-white font-semibold tracking-wide text-sm bg-green-600 px-7 rounded-md">
            PUBLICAR
          </button>
          <div className="flex items-center gap-3">
            <span className="text-white text-2xl">
              <MdKeyboardArrowDown />
            </span>
            <p className="text-white">Julian Álvarez</p>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-500"></div>
          </div>
        </div>
      </nav>
      <div className="flex flex-wrap xl:flex-nowrap justify-center xl:justify-start gap-16 xl:gap-24 mt-20">
        <div className="w-11/12 md:w-3/4 xl:w-1/2 h-auto">
          <div className="flex flex-col items-center justify-center w-full h-448 sm:h-609 border-2 border-light-200 border-dashed rounded-md">
            <div className="grid place-items-center w-24 h-24 bg-dark-500 rounded-full mb-5">
              <span className="text-green-500 text-5xl">
                <BsArrowUp />
              </span>
            </div>
            <p className="text-white">JPG, GIF or PNG. Max size of 800K</p>
            <button className="text-white bg-green-600 mt-5 py-3 px-6 rounded-md">
              Seleccionar Archivo
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center xl:justify-start text-white gap-4 mt-6 lg:mb-0 xl:mb-32">
            <h1>PROPORCIÓN</h1>
            <button className="w-48 sm:w-auto flex items-center gap-3 bg-green-600 py-3 px-4 rounded-md">
              <span className="text-2xl">
                <BsTabletLandscape />
              </span>
              HORIZONTAL
            </button>
            <button className="w-48 sm:w-auto flex items-center justify-center gap-3 bg-ocean_blue-300 py-3 px-4 rounded-md">
              <span className="text-2xl">
                <BsTablet />
              </span>
              VERTICAL
            </button>
            <button className="w-48 sm:w-auto flex items-center gap-3 bg-ocean_blue-300 py-3 px-4 rounded-md">
              <span className="text-2xl">
                <CgDice1 />
              </span>
              CUADRADA
            </button>
          </div>
        </div>
        <div className="w-11/12 md:w-3/4 xl:w-1/2">
          <h1 className="text-white text-2xl mb-10">Nueva publicación</h1>
          <form action="">
            <div className="w-full flex flex-col mb-8">
              <label htmlFor="titulo" className="text-white mb-2">
                TITULO
              </label>
              <input
                id="titulo"
                type="text"
                placeholder="Agrega un titulo a tu publicación"
                className="w-full placeholder-light-200 bg-ocean_blue-300 p-3 rounded-md text-white"
              />
            </div>
            <div className="w-full flex flex-col mb-8">
              <label htmlFor="estilos" className="text-white mb-2">
                ESTILOS
              </label>
              <input
                id="estilos"
                type="text"
                placeholder="En qué estilo está hecho este tatuaje"
                className="w-full placeholder-light-200 bg-ocean_blue-300 p-3 rounded-md text-white"
              />
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="descripción" className="text-white mb-2">
                DESCRIPCIÓN
              </label>
              <textarea
                name=""
                id="descripción"
                rows={6}
                placeholder="Cuéntanos más detalles acerca de este tatuaje"
                className="w-full placeholder-light-200 bg-ocean_blue-300 p-3 rounded-md resize-none text-white"
              ></textarea>
            </div>
          </form>
          <div className="flex gap-8 text-white mt-5 xl:mt-32 ml-5 justify-center mb-5">
            <button className="py-3 px-4">CANCELAR</button>
            <button className="flex items-center gap-3 py-3 px-5 sm:px-20 bg-green-600 rounded-md">
              PUBLICAR
              <span className="text-2xl">
                <BsArrowRight />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostArtist
