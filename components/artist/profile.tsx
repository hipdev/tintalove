import Link from 'next/link'
import { AiFillFacebook } from 'react-icons/ai'
import { BsArrowDown, BsBookmarkPlus } from 'react-icons/bs'
import { FaTwitter } from 'react-icons/fa'
import { FiClock, FiInstagram } from 'react-icons/fi'
import { RiCalendarLine, RiRoadMapLine } from 'react-icons/ri'

const ArtistProfile = ({ artistData }) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row mx-6 lg:mx-12 space-x-0 lg:space-x-8 mt-5">
        <div className="flex-shrink-0 self-center lg:self-start rounded-lg overflow-hidden mb-5 lg:mb-0">
          <div>
            <img
              // src="https://via.placeholder.com/309x287"
              src={
                artistData?.profile_picture?.url
                  ? `${artistData.profile_picture.url}/tr:pr-true,c-at_max,f-auto,h-287,q-100`
                  : 'https://via.placeholder.com/309x287'
              }
              alt=""
              className="w-full"
            />
          </div>
          <div className="h-80 relative bg-dark-700 bg-opacity-50 px-5 py-6 rounded-b-lg">
            <h1 className="text-white text-xl font-semibold font-raleway tracking-wide">
              {artistData?.displayName || 'Sin nombre'}
            </h1>
            <h6 className="text-light-700 text-xs">
              {artistData?.city_name || 'Sin ciudad'},
              {artistData?.province || 'Sin departamento'}
            </h6>
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
                  {artistData?.times || 'Sin horarios'}
                </p>
              </div>
            </div>
            <button className="btn-red font-light tracking-wide w-full focus:outline-none">
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
                  {artistData?.styles?.length + 1 || '0'} Estilos
                </h1>
                <div>
                  <button className="text-light-700 font-raleway border border-light-700 px-2 py-1 rounded-lg mb-2 mr-2 focus:outline-none">
                    Realismo
                  </button>

                  {artistData?.styles
                    ? artistData.styles.map((style) => (
                        <button
                          key={style}
                          className="text-light-700 font-raleway border border-light-700 px-2 py-1 rounded-lg mb-2 mr-2 focus:outline-none"
                        >
                          {style}
                        </button>
                      ))
                    : 'Sin estilos'}
                </div>
              </div>
              <div className="w-full pl-0 lg:pl-10">
                <h1 className="text-white text-xl font-semibold font-raleway tracking-wide mb-2">
                  Biografía
                </h1>
                <p className="text-light-700 font-raleway">
                  {artistData?.bio || 'Sin bio'}
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
                  Ver todo
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
    </>
  )
}

export default ArtistProfile
