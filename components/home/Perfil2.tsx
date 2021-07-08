import { FiInstagram } from 'react-icons/fi'
import { AiFillFacebook } from 'react-icons/ai'
import { FaTwitter } from 'react-icons/fa'
import { RiCalendarLine } from 'react-icons/ri'
import { RiRoadMapLine } from 'react-icons/ri'
import { FiClock } from 'react-icons/fi'
import { BsBookmarkPlus } from 'react-icons/bs'
import { BsArrowDown } from 'react-icons/bs'
import { TiLocationOutline } from 'react-icons/ti'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaFacebookSquare } from 'react-icons/fa'
import { GoSearch } from 'react-icons/go'
import Link from 'next/link'

const Profile2 = () => {
  return (
    <div className="w-full h-auto bg-gradient-to-r from-black via-red-900 to-black">
      <nav className="flex flex-col lg:flex-row px-2 sm:px-20 py-4">
        <div className="w-full flex flex-wrap justify-center xl:justify-between items-center">
          <div className="flex flex-wrap justify-center items-center">
            <div className="w-full lg:w-44 mb-5 lg:mb-1 flex justify-center">
              <Link href="/">
                <a className="relative flex items-center">
                  <div className="absolute top-0 left-16 w-10 h-10 bg-red-600 rounded-full z-0"></div>
                  <h1 className="text-white text-3xl font-bold font-raleway ml-2 z-10">
                    Tintalovers
                  </h1>
                </a>
              </Link>
            </div>
            <div className="relative ml-0 lg:ml-10">
              <form action="">
                <input
                  type="text"
                  placeholder="Buscar"
                  className="w-full lg:w-56 bg-transparent border border-white rounded-xl pl-4 pr-12 py-3 placeholder-white outline-none"
                />
                <span className="absolute top-3.5 right-5 text-white text-2xl">
                  <GoSearch />
                </span>
              </form>
            </div>
            <div className="w-full md:w-96 xl:w-80 flex flex-wrap justify-evenly py-4 lg:py-0">
              <Link href="/">
                <a className="text-white">Tatuajes</a>
              </Link>
              <Link href="/">
                <a className="text-white">Artistas</a>
              </Link>
              <Link href="/">
                <a className="text-white">Soy un artista</a>
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center xl:justify-end items-center flex-grow mt-2 lg:mt-5 xl:mt-0">
            <div className="flex flex-wrap justify-evenly py-4 md:py-0 mr-0 md:mr-7">
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
            <button className="btn-primary w-auto text-white px-5 py-3 mx-auto sm:mx-0 rounded-lg focus:outline-none">
              Acceder
            </button>
          </div>
        </div>
      </nav>
      <div className="flex flex-col lg:flex-row mx-6 lg:mx-12 space-x-0 lg:space-x-8 mt-5">
        <div className="flex-shrink-0 self-center lg:self-start rounded-lg overflow-hidden mb-5 lg:mb-0">
          <div>
            <img
              src="https://via.placeholder.com/309x287"
              alt=""
              className="w-full"
            />
          </div>
          <div className="h-80 relative bg-dark-700 bg-opacity-50 px-5 py-6 rounded-b-lg">
            <h1 className="text-white text-xl font-semibold font-raleway tracking-wide">
              Daniela Castillo
            </h1>
            <h6 className="text-light-700 text-xs">Medellín, Antioquia</h6>
            <div className="flex space-x-4 my-4">
              <Link href="#">
                <a>
                  <span className="text-2xl text-light-700">
                    <FiInstagram />
                  </span>
                </a>
              </Link>
              <Link href="#">
                <a>
                  <span className="text-2xl text-light-700">
                    <AiFillFacebook />
                  </span>
                </a>
              </Link>
              <Link href="#">
                <a>
                  <span className="text-2xl text-light-700">
                    <FaTwitter />
                  </span>
                </a>
              </Link>
            </div>
            <div>
              <div className="flex space-x-2">
                <span className="text-light-500">
                  <RiCalendarLine />
                </span>
                <p className="text-light-500 text-xs">Disponible en 2 meses</p>
              </div>
              <div className="flex space-x-2 my-2">
                <span className="text-light-500">
                  <RiRoadMapLine />
                </span>
                <p className="text-light-500 text-xs">Cómo llegar</p>
              </div>
              <div className="flex space-x-2 mb-5">
                <span className="text-light-500">
                  <FiClock />
                </span>
                <p className="text-light-500 text-xs">
                  Lunes a viernes, de 10am - 7pm
                  <br />
                  Sábados, Domingos y Festivos 10:00am <br /> 1:00pm
                </p>
              </div>
            </div>
            <button className="btn-primary font-light tracking-wide w-full focus:outline-none">
              Contáctame
            </button>
            <button className="absolute top-0 right-0 -mt-6 mr-5 w-12 h-12 flex justify-center items-center text-white text-2xl bg-red-600 rounded-full focus:outline-none">
              <span>
                <BsBookmarkPlus />
              </span>
            </button>
          </div>
        </div>
        <div className="w-full h-96 sm:h-609 bg-dark-700 bg-opacity-50 rounded-lg p-8">
          <div className="w-full h-full overflow-auto">
            <div className="flex flex-col lg:flex-row mb-5">
              <div className="w-64 sm:w-96 mb-2 sm:mb-0">
                <h1 className="text-white text-xl font-semibold font-raleway tracking-wide mb-2">
                  6 Estilos
                </h1>
                <div>
                  <button className="text-light-700 font-raleway border border-light-700 px-2 py-1 rounded-lg mb-2 mr-2 focus:outline-none">
                    Realismo
                  </button>
                  <button className="text-light-700 font-raleway border border-light-700 px-2 py-1 rounded-lg mb-2 mr-2 focus:outline-none">
                    Puntillismo
                  </button>
                  <button className="text-light-700 font-raleway border border-light-700 px-2 py-1 rounded-lg mb-2 mr-2 focus:outline-none">
                    Sombras
                  </button>
                  <button className="text-light-700 font-raleway border border-light-700 px-2 py-1 rounded-lg mb-2 mr-2 focus:outline-none">
                    Nueva escuela
                  </button>
                  <button className="text-light-700 font-raleway border border-light-700 px-2 py-1 rounded-lg mb-2 mr-2 focus:outline-none">
                    Color
                  </button>
                  <button className="text-light-700 font-raleway border border-light-700 px-2 py-1 rounded-lg mb-2 mr-2 focus:outline-none">
                    Maori
                  </button>
                </div>
              </div>
              <div className="w-full pl-0 lg:pl-10">
                <h1 className="text-white text-xl font-semibold font-raleway tracking-wide mb-2">
                  Biografía
                </h1>
                <p className="text-light-700 font-raleway">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
            <div className="border-t border-white pt-5">
              <div className="flex flex-wrap justify-between mb-4">
                <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                  <h2 className="text-white text-lg font-medium font-raleway">
                    Mi trabajo
                  </h2>
                  <p className="text-light-700">20 fotos · 2 Videos</p>
                </div>
                <button className="flex items-center text-white font-raleway focus:outline-none">
                  Ver todo{' '}
                  <span className="text-red-600 text-2xl">
                    <BsArrowDown />
                  </span>
                </button>
              </div>
              <div className="w-full h-full grid grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-3 lg:gap-6">
                <div className="col-span-3 sm:col-span-2">
                  <img
                    src="https://via.placeholder.com/399x333"
                    alt=""
                    className="w-full h-full rounded-lg"
                  />
                </div>
                <div>
                  <img
                    src="https://via.placeholder.com/152x265"
                    alt=""
                    className="w-full h-full rounded-lg"
                  />
                </div>
                <div>
                  <img
                    src="https://via.placeholder.com/152x265"
                    alt=""
                    className="w-full h-full rounded-lg"
                  />
                </div>
                <div>
                  <img
                    src="https://via.placeholder.com/152x265"
                    alt=""
                    className="w-full h-full rounded-lg"
                  />
                </div>
                <div className="col-span-1 xl:col-span-2">
                  <img
                    src="https://via.placeholder.com/399x333"
                    alt=""
                    className="w-full h-full rounded-lg"
                  />
                </div>
                <div className="col-span-2 sm:col-span-3">
                  <img
                    src="https://via.placeholder.com/399x219"
                    alt=""
                    className="w-full h-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center h-72 sm:h-80 mt-5 bg-black">
        <div className="flex flex-col items-center text-center px-3 sm:px-0">
          <h1 className="text-4xl sm:text-5xl text-white font-bold font-raleway mb-2">
            ¿Eres un artista?
          </h1>
          <p className="text-light-700 text-center mb-5">
            Únete a nuestra plataforma y se encontrado por clientes potenciales
          </p>
          <button className="text-white bg-red-600 font-raleway px-4 py-2 rounded-lg">
            Regístrate
          </button>
        </div>
      </div>
      <footer className="flex w-full h-auto xl:h-24 py-5 bg-black">
        <div className="flex flex-col lg:flex-row w-full justify-between items-center px-8 sm:px-20 md:px-40">
          <div className="w-48 lg:w-60 mb-3 lg:mb-0">
            <Link href="/">
              <a className="relative flex items-center">
                <div className="absolute top-0 left-0 w-10 h-10 bg-red-600 rounded-full z-0"></div>
                <h1 className="text-white text-3xl font-bold font-raleway ml-2 z-10">
                  Tintalovers
                </h1>
              </a>
            </Link>
          </div>
          <div className="w-full flex flex-wrap justify-center leading-7">
            <Link href="/">
              <a className="text-sm sm:text-base text-white mx-3">
                Política de privacidad
              </a>
            </Link>
            <Link href="/">
              <a className="text-sm sm:text-base text-white mx-3">
                Términos y condiciones
              </a>
            </Link>
            <Link href="/">
              <a className="text-sm sm:text-base text-white mx-3">Tatuajes</a>
            </Link>
            <Link href="/">
              <a className="text-sm sm:text-base text-white mx-3">Artistas</a>
            </Link>
            <Link href="/">
              <a className="text-sm sm:text-base text-white mx-3">Nosotros</a>
            </Link>
            <Link href="/">
              <a className="text-sm sm:text-base text-white mx-3">
                Soy un artista
              </a>
            </Link>
            <Link href="/">
              <a className="text-sm sm:text-base text-white mx-3">Registrate</a>
            </Link>
            <Link href="/">
              <a className="text-sm sm:text-base text-white mx-3">
                Iniciar sesión
              </a>
            </Link>
            <Link href="/">
              <a className="text-white text-2xl mx-3">
                <AiOutlineInstagram />
              </a>
            </Link>
            <Link href="/">
              <a className="text-white text-2xl mx-3">
                <FaFacebookSquare />
              </a>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Profile2
