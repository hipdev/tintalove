import { FaRegUserCircle } from "react-icons/fa";
import { GoSearch } from 'react-icons/go';
import { TiLocationOutline } from 'react-icons/ti';
import Link from "next/link";

const Step4 = () => {
  return(
  <div className="w-full h-auto lg:h-screen bg-gray-800">
    <div className="h-full flex flex-col">
      <nav className='flex flex-col lg:flex-row px-2 sm:px-20 py-4'>
        <div className='w-full flex flex-wrap justify-center xl:justify-between items-center'>
          <div className='flex flex-wrap justify-center items-center'>
            <div className='w-full lg:w-44 mb-5 lg:mb-1 flex justify-center'>
              <Link href='/'>
                <a className='relative flex items-center'>
                  <div className='absolute top-0 left-16 w-10 h-10 bg-red-600 rounded-full z-0'></div>
                  <h1 className='text-white text-3xl font-bold font-raleway ml-2 z-10'>
                    Tintalovers
                  </h1>
                </a>
              </Link>
            </div>
            <div className="relative ml-0 lg:ml-10">
              <form action="">
                <input type="text" placeholder="Buscar" className="w-full lg:w-56 bg-transparent border border-white rounded-xl pl-4 pr-12 py-3 placeholder-white outline-none"/>
                <span className="absolute top-3.5 right-5 text-white text-2xl"><GoSearch /></span>
              </form>
            </div>
            <div className='w-full md:w-96 xl:w-80 flex flex-wrap justify-evenly py-4 lg:py-0'>
              <Link href='/'>
                <a className='text-white'>Tatuajes</a>
              </Link>
              <Link href='/'>
                <a className='text-white'>Artistas</a>
              </Link>
              <Link href='/'>
                <a className='text-white'>Soy un artista</a>
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center xl:justify-end items-center flex-grow mt-2 lg:mt-5 xl:mt-0">
            <div className='flex flex-wrap justify-evenly py-4 md:py-0 mr-0 md:mr-7'>
              <div className='flex items-center space-x-2'>
                <span className='text-3xl text-red-600'>
                  <TiLocationOutline />
                </span>
                <select
                  name=''
                  id=''
                  className='bg-transparent text-white font-raleway underline focus:outline-none mr-3'>
                  <option value=''>Todo Colombia</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="#">
                <a className="text-white">Julián Álvarez</a>
              </Link>
              <div className="w-10 h-10 bg-indigo-700 rounded-full">
                <img src="" alt=""/>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-full flex flex-col lg:flex-row justify-evenly items-center">
        <div className="mb-10 lg:mb-0">
          <div className="mb-10 mt-12">
            <p className="text-red-500">¿Eres un artista?</p>
            <h1 className="text-2xl text-white font-bold tracking-wide">Registrate</h1>
          </div>
          <ol>
            <li className="relative pb-10">
              <div className="-ml-px absolute mt-6 top-4 left-4 w-0.5 h-8 bg-light-900 border border-dashed"></div>
              <div className="relative flex items-start cursor-default">
                <span className="h-9 flex items-center">
                  <span className="relative z-10 w-8 h-8 flex items-center justify-center border-2 border-white rounded-full">
                    <span className="text-white">1</span>
                  </span>
                </span>
                <span className="ml-4 min-w-0 mt-1.5">
                  <span className="text-sm text-white tracking-wide">Información personal</span>
                </span>
              </div>
            </li>
            <li className="relative pb-10">
              <div className="-ml-px absolute mt-6 top-4 left-4 w-0.5 h-8 bg-light-900 border border-dashed"></div>
              <div  className="relative flex items-start cursor-default">
                <span className="h-9 flex items-center">
                  <span className="relative z-10 w-8 h-8 flex items-center justify-center border-2 border-white rounded-full">
                    <span className="text-white">2</span>
                  </span>
                </span>
                <span className="ml-4 min-w-0 mt-1.5">
                  <span className="text-sm text-white tracking-wide">Información laboral</span>
                </span>
              </div>
            </li>
            <li className="relative pb-10">
              <div className="-ml-px absolute mt-6 top-4 left-4 w-0.5 h-8 bg-light-900 border border-dashed"></div>
              <div  className="relative flex items-start cursor-default">
                <span className="h-9 flex items-center">
                  <span className="relative z-10 w-8 h-8 flex items-center justify-center border-2 border-white rounded-full">
                    <span className="text-white">3</span>
                  </span>
                </span>
                <span className="ml-4 min-w-0 mt-1.5">
                  <span className="text-sm text-white tracking-wide">Información de contacto</span>
                </span>
              </div>
            </li>
            <li className="relative">
              <div  className="relative flex items-start cursor-default">
                <span className="h-9 flex items-center">
                  <span className="relative z-10 w-8 h-8 flex items-center justify-center border-2 border-red-500 rounded-full">
                    <span className="text-white">4</span>
                  </span>
                </span>
                <span className="ml-4 min-w-0 mt-1.5">
                  <span className="text-sm text-white tracking-wide">Foto de perfil</span>
                </span>
              </div>
            </li>
          </ol>
        </div>
        <div className="relative w-10/12 sm:w-2/3 h-auto bg-dark-700 bg-opacity-50 rounded-xl p-6 sm:p-12 mb-10 lg:mb-0">
          <div>
            <h1 className="text-white text-xl sm:text-2xl font-bold text-center sm:text-left tracking-wide mb-10">Foto De Perfil</h1>
            <form action="">
                <div className="flex justify-center">
                  <div className="w-96 h-72 flex flex-col justify-center items-center border-4 border-dashed border-gray-200 rounded-xl mb-5 sm:mb-0">
                    <span className="text-4xl text-light-900 mb-4"><FaRegUserCircle /></span>
                    <p className="text-sm sm:text-base text-white text-center mb-4">JPG, GIF or PNG. Max size of 800K</p>
                    <div className="relative bg-light-900 px-4 py-3 rounded-lg">
                      <p className="text-white tracking-wide">Seleccionar Archivo</p>
                      <input type="file" className="absolute top-0 right-0 bottom-0 left-0 w-full h-full opacity-0"/>
                    </div>
                  </div>
                </div>
            </form>
            <button className="block absolute right-10 -bottom-5 btn-red py-3 px-5">Finalizar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Step4;