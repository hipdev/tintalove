import { GoSearch } from 'react-icons/go';
import { TiLocationOutline } from 'react-icons/ti';
import Link from "next/link";

const Step2 = () => {
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
                  <span className="relative z-10 w-8 h-8 flex items-center justify-center border-2 border-red-500 rounded-full">
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
                  <span className="relative z-10 w-8 h-8 flex items-center justify-center border-2 border-light-900 rounded-full">
                    <span className="text-light-900">3</span>
                  </span>
                </span>
                <span className="ml-4 min-w-0 mt-1.5">
                  <span className="text-sm text-light-900 tracking-wide">Información de contacto</span>
                </span>
              </div>
            </li>
            <li className="relative">
              <div  className="relative flex items-start cursor-default">
                <span className="h-9 flex items-center">
                  <span className="relative z-10 w-8 h-8 flex items-center justify-center border-2 border-light-900 rounded-full">
                    <span className="text-light-900">4</span>
                  </span>
                </span>
                <span className="ml-4 min-w-0 mt-1.5">
                  <span className="text-sm text-light-900 tracking-wide">Foto de perfil</span>
                </span>
              </div>
            </li>
          </ol>
        </div>
        <div className="relative w-10/12 sm:w-2/3 h-auto bg-dark-700 bg-opacity-50 rounded-xl p-6 sm:p-12 mb-10 lg:mb-0">
          <div>
            <h1 className="text-white text-xl sm:text-2xl font-bold text-center sm:text-left tracking-wide mb-10">Información Laboral</h1>
            <form action="">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 lg:col-span-5 xl:col-span-3">
                  <label htmlFor="" className="block text-white text-sm uppercase mb-3 tracking-wide">Estilos</label>
                  <select name="" id="" className="block w-full bg-transparent border-2 border-light-900 text-white p-2 rounded-xl placeholder-light-900 outline-none">
                    <option value="" selected>Selecciona tus especializaciones</option>
                  </select>
                </div>
                <div className="col-span-6 lg:col-span-5 xl:col-span-3">
                  <label htmlFor="" className="block text-white text-sm uppercase mb-3 tracking-wide">Disponibilidad</label>
                  <select name="" id="" className="block w-full bg-transparent border-2 border-light-900 text-white p-2 rounded-xl placeholder-light-900 outline-none">
                    <option value="" selected>¿En cuanto tiempo estaras disponible?</option>
                  </select>
                </div>
                <div className="col-span-6 mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <label htmlFor="" className="block text-white text-sm uppercase tracking-wide">Horarios</label>
                    <span className="text-white">0/100</span>
                  </div>
                  <textarea name="" id="" rows="6" placeholder="Ej. Lunes a viernes, de 10am - 7pm&#10;Sábados, Domingos y Festivos&#10;10:00am 1:00pm" className="w-full bg-transparent border-2 border-light-900 p-2 rounded-xl placeholder-light-900 outline-none resize-none"></textarea>
                </div>
              </div>
            </form>
            <button className="block absolute right-10 -bottom-5 btn-red py-3 px-5">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Step2;