import { TiLocationOutline } from 'react-icons/ti'
import { GoSearch } from 'react-icons/go'
import { CgMenuGridO } from 'react-icons/cg'
import { BsArrowLeft } from 'react-icons/bs'
import { BsBookmark } from 'react-icons/bs'
import Link from 'next/link'

const NewProfile = () => {
  return (
    <div className="w-full h-auto bg-black">
      <nav className="flex flex-col lg:flex-row px-2 sm:px-32 py-4 bg-dark-700">
        <div className="w-full flex flex-wrap xl:flex-no-wrap justify-center xl:justify-between items-center">
          <div className="flex flex-col md:flex-row flex-wrap items-center mb-0 md:mb-5 xl:mb-0">
            <div className="w-48 lg:w-240 mb-1">
              <Link href="/">
                <a className="flex items-center">
                  <div className="w-10 h-10 bg-red-600 rounded-full"></div>
                  <h1 className="block text-white text-3xl font-bold font-raleway absolute ml-2">
                    Tintalovers
                  </h1>
                </a>
              </Link>
            </div>
            <div className="flex flex-wrap justify-evenly mb-2 lg:mb-0 py-4 md:py-0">
              <div className="flex items-center space-x-2">
                <span className="text-3xl text-red-600">
                  <TiLocationOutline />
                </span>
                <select
                  name=""
                  id=""
                  className="bg-transparent text-white font-raleway underline focus:outline-none mr-3"
                >
                  <option value="">Medellín, Antioquia</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap xl:flex-no-wrap justify-center lg:justify-end items-center">
            <div className="relative flex justify-center items-center mb-3 lg:mb-0">
              <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                <span className="text-black text-xl sm:text-2xl">
                  <GoSearch />
                </span>
              </div>
              <input
                type="text"
                placeholder="Buscar..."
                className="block w-48 sm:w-96 py-3 pl-12 rounded-l-lg focus:outline-none placeholder-black"
              />
              <button
                type="submit"
                className="text-white bg-red-600 px-5 py-3 rounded-r-lg focus:outline-none tracking-wide"
              >
                Buscar
              </button>
            </div>
            <div className="flex mb-0 sm:mb-3 lg:mb-0">
              <button className="w-1/2 sm:w-auto text-white font-raleway border border-light-700 px-5 py-3 rounded-lg focus:outline-none mx-8 xl:mx-10">
                Ingresar
              </button>
              <button className="flex items-center text-white font-raleway p-3 focus:outline-none">
                Menú{' '}
                <span className="text-3xl text-light-700 pl-3">
                  <CgMenuGridO />
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="px-0 md:px-16 xl:px-32">
        <div className="relative w-full h-75  bg-gray-600 rounded-lg p-4 mb-99 sm:mb-97 lg:mb-224 xl:mb-224">
          <div className="flex justify-between">
            <div className="w-12 h-12 flex justify-center items-center bg-dark-700 rounded-lg">
              <span className="text-white text-3xl">
                <BsArrowLeft />
              </span>
            </div>
            <div className="flex space-x-3">
              <button className="btn-primary px-5">Contáctame</button>
              <div className="w-12 h-12 flex justify-center items-center bg-dark-700 rounded-lg">
                <span className="text-white text-3xl">
                  <BsBookmark />
                </span>
              </div>
            </div>
            <div className="absolute top-0 left-0 ml-4 mt-224 lg:mt-272 flex flex-col lg:flex-row w-auto h-auto space-x-0 lg:space-x-4 mb-20">
              <img
                src="https://via.placeholder.com/186x186"
                alt=""
                className="w-48 h-48 rounded-lg mb-3 lg:mb-0 self-center lg:self-start"
              />
              <div className="w-10/12 flex flex-col md:flex-row bg-dark-700 pl-5 md:pl-6 xl:pl-12 pr-5 md:pr-2 py-12 rounded-lg self-center lg:self-start">
                <div className="w-auto md:w-2/3 xl:w-99 border-b-2 md:border-b-0 md:border-r-2 border-red-600 pr-0 md:pr-10 mr-0 md:mr-10 mb-4 md:mb-0">
                  <h1 className="text-white text-xl font-bold font-raleway mb-2 md:mb-1">
                    Daniel Castillo
                  </h1>
                  <p className="text-sm text-gray-500 mb-3 md:mb-0">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea
                  </p>
                </div>
                <div className="">
                  <Link href="/">
                    <a className="text-white font-raleway underline block mb-3">
                      Medellín, Antioquia
                    </a>
                  </Link>
                  <p className="text-white font-raleway -mb-1">Estilos:</p>
                  <Link href="/">
                    <a className="text-gray-500 text-sm font-raleway underline">
                      Sombras,{' '}
                    </a>
                  </Link>
                  <Link href="/">
                    <a className="text-gray-500 text-sm font-raleway underline">
                      Puntillismo,{' '}
                    </a>
                  </Link>
                  <Link href="/">
                    <a className="text-gray-500 text-sm font-raleway underline">
                      Tribal,{' '}
                    </a>
                  </Link>
                  <Link href="/">
                    <a className="text-gray-500 text-sm font-raleway underline">
                      Geometrico,{' '}
                    </a>
                  </Link>
                  <Link href="/">
                    <a className="text-gray-500 text-sm font-raleway underline">
                      Realista
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 lg:px-20 xl:px-0">
          <div className="flex items-center border-t-2 border-light-700">
            <div className="w-full items-center my-2">
              <div className="">
                <Link href="/">
                  <a className="text-sm sm:text-base text-light-700 font-raleway mr-6 sm:mr-12 inline-block py-0 sm:py-4">
                    Todos
                  </a>
                </Link>
                <Link href="/">
                  <a className="text-sm sm:text-base text-light-700 font-raleway mr-6 sm:mr-12 inline-block py-0 sm:py-4">
                    Geometrico
                  </a>
                </Link>
                <Link href="/">
                  <a className="text-sm sm:text-base text-light-700 font-raleway mr-6 sm:mr-12 inline-block py-0 sm:py-4">
                    Puntillismo
                  </a>
                </Link>
                <Link href="/">
                  <a className="text-sm sm:text-base text-light-700 font-raleway mr-6 sm:mr-12 inline-block py-0 sm:py-4">
                    Acuarela
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="">
            <div className="w-full grid grid-cols-3 lg:grid-cols-6 grid-rows-3 gap-2 lg:gap-3 xl:gap-4 h-auto ">
              <div className="col-span-2 row-span-2">
                <img
                  src="https://via.placeholder.com/388x388"
                  alt=""
                  className="w-full rounded-lg"
                />
              </div>
              <div className="w-full flex">
                <img
                  src="https://via.placeholder.com/186x186"
                  alt=""
                  className="w-full rounded-lg"
                />
              </div>
              <div>
                <img
                  src="https://via.placeholder.com/186x186"
                  alt=""
                  className="w-full rounded-lg"
                />
              </div>
              <div>
                <img
                  src="https://via.placeholder.com/186x186"
                  alt=""
                  className="w-full rounded-lg"
                />
              </div>
              <div>
                <img
                  src="https://via.placeholder.com/186x186"
                  alt=""
                  className="w-full rounded-lg"
                />
              </div>
              <div>
                <img
                  src="https://via.placeholder.com/186x186"
                  alt=""
                  className="w-full rounded-lg"
                />
              </div>
              <div>
                <img
                  src="https://via.placeholder.com/186x186"
                  alt=""
                  className="w-full rounded-lg"
                />
              </div>
              <div className="col-span-2 row-span-2">
                <img
                  src="https://via.placeholder.com/388x388"
                  alt=""
                  className="w-full rounded-lg"
                />
              </div>
              <div>
                <img
                  src="https://via.placeholder.com/186x186"
                  alt=""
                  className="w-full rounded-lg"
                />
              </div>
              <div>
                <img
                  src="https://via.placeholder.com/186x186"
                  alt=""
                  className="w-full rounded-lg"
                />
              </div>
              <div>
                <img
                  src="https://via.placeholder.com/186x186"
                  alt=""
                  className="w-full rounded-lg"
                />
              </div>
              <div>
                <img
                  src="https://via.placeholder.com/186x186"
                  alt=""
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewProfile
