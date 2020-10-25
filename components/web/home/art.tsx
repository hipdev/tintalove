import { GoSearch } from "react-icons/go";
import { TiLocationOutline } from "react-icons/ti";
import Link from "next/link";

const Artistas = () => {
  return (
    <div className='py-20 px-10 sm:px-20 lg:px-40 bg-black'>
      <div className='flex flex-wrap justify-around sm:justify-between mb-10'>
        <div className='flex items-center space-x-3 mb-3 sm:mb-0'>
          <span className='text-red-600 text-2xl'><GoSearch /></span>
          <p className='text-gray-500 font-raleway underline'>Resultados de: Tribales</p>
        </div>
        <div className='flex items-center space-x-2 mb-3 sm:mb-0'>
            <span className='text-3xl text-red-600'><TiLocationOutline  /></span>
            <Link href=''><a className='text-gray-500 font-raleway underline'>Medellín, Antioquia</a></Link>
          </div>
      </div>
      <div className='flex justify-between mb-6 border-b-2 border-gray-500'>
        <h1 className='text-white text-xl font-semibold font-raleway'>Artistas</h1>
        <select name="" id="" className='bg-dark-700 text-white font-raleway px-4 py-2 rounded-lg'>
          <option value="">Filtrar por</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-5">
        <div>
          <img
            src="https://via.placeholder.com/287x215"
            alt=""
            className="w-full rounded-lg mb-3"
          />
          <div className="flex items-center bg-dark-700 rounded-lg p-2 space-x-3">
            <img
              src="https://via.placeholder.com/60x60"
              alt=""
              className="w-13 h-13 rounded-lg"
            />
            <div>
              <h1 className="text-white text-lg font-raleway">Daniel Castillo</h1>
              <p className="text-gray-500 text-xs lg:text-sm font-raleway">
                Medellín, Antioquia
              </p>
              <p className="text-red-600 text-sm lg:text-base font-raleway">
                Tribales, Geometría, Puntillismo 3+...
              </p>
            </div>
          </div>
        </div>
        <div>
          <img
            src="https://via.placeholder.com/287x215"
            alt=""
            className="w-full rounded-lg mb-3"
          />
          <div className="flex items-center bg-dark-700 rounded-lg p-2 space-x-3">
            <img
              src="https://via.placeholder.com/60x60"
              alt=""
              className="w-13 h-13 rounded-lg"
            />
            <div>
              <h1 className="text-white text-lg font-raleway">Armando Casas</h1>
              <p className="text-gray-500 text-xs lg:text-sm font-raleway">
                Medellín, Antioquia
              </p>
              <p className="text-red-600 text-sm lg:text-base font-raleway">
                Tribales, Geometría, Puntillismo 3+...
              </p>
            </div>
          </div>
        </div>
        <div>
          <img
            src="https://via.placeholder.com/287x215"
            alt=""
            className="w-full rounded-lg mb-3"
            />
          <div className="flex items-center bg-dark-700 rounded-lg p-2 space-x-3">
            <img
              src="https://via.placeholder.com/60x60"
              alt=""
              className="w-13 h-13 rounded-lg"
            />
            <div>
              <h1 className="text-white text-lg font-raleway">Daniela Castillo</h1>
              <p className="text-gray-500 text-xs lg:text-sm font-raleway">
                Medellín, Antioquia
              </p>
              <p className="text-red-600 text-sm lg:text-base font-raleway">
                Tribales, Geometría, Puntillismo 3+...
              </p>
            </div>
          </div>
        </div>
        <div>
          <img
            src="https://via.placeholder.com/287x215"
            alt=""
            className="w-full rounded-lg mb-3"
          />
          <div className="flex items-center bg-dark-700 rounded-lg p-2 space-x-3">
            <img
              src="https://via.placeholder.com/60x60"
              alt=""
              className="w-13 h-13 rounded-lg"
            />
            <div>
              <h1 className="text-white text-lg font-raleway">Esteban Dido</h1>
              <p className="text-gray-500 text-xs lg:text-sm font-raleway">
                Medellín, Antioquia
              </p>
              <p className="text-red-600 text-sm lg:text-base font-raleway">
                Tribales, Geometría, Puntillismo 3+...
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-5">
        <div>
          <img
            src="https://via.placeholder.com/287x215"
            alt=""
            className="w-full rounded-lg mb-3"
          />
          <div className="flex items-center bg-dark-700 rounded-lg p-2 space-x-3">
            <img
              src="https://via.placeholder.com/60x60"
              alt=""
              className="w-13 h-13 rounded-lg"
            />
            <div>
              <h1 className="text-white text-lg font-raleway">Daniel Castillo</h1>
              <p className="text-gray-500 text-xs lg:text-sm font-raleway">
                Medellín, Antioquia
              </p>
              <p className="text-red-600 text-sm lg:text-base font-raleway">
                Tribales, Geometría, Puntillismo 3+...
              </p>
            </div>
          </div>
        </div>
        <div>
          <img
            src="https://via.placeholder.com/287x215"
            alt=""
            className="w-full rounded-lg mb-3"
          />
          <div className="flex items-center bg-dark-700 rounded-lg p-2 space-x-3">
            <img
              src="https://via.placeholder.com/60x60"
              alt=""
              className="w-13 h-13 rounded-lg"
            />
            <div>
              <h1 className="text-white text-lg font-raleway">Armando Casas</h1>
              <p className="text-gray-500 text-xs lg:text-sm font-raleway">
                Medellín, Antioquia
              </p>
              <p className="text-red-600 text-sm lg:text-base font-raleway">
                Tribales, Geometría, Puntillismo 3+...
              </p>
            </div>
          </div>
        </div>
        <div>
          <img
            src="https://via.placeholder.com/287x215"
            alt=""
            className="w-full rounded-lg mb-3"
            />
          <div className="flex items-center bg-dark-700 rounded-lg p-2 space-x-3">
            <img
              src="https://via.placeholder.com/60x60"
              alt=""
              className="w-13 h-13 rounded-lg"
            />
            <div>
              <h1 className="text-white text-lg font-raleway">Daniela Castillo</h1>
              <p className="text-gray-500 text-xs lg:text-sm font-raleway">
                Medellín, Antioquia
              </p>
              <p className="text-red-600 text-sm lg:text-base font-raleway">
                Tribales, Geometría, Puntillismo 3+...
              </p>
            </div>
          </div>
        </div>
        <div>
          <img
            src="https://via.placeholder.com/287x215"
            alt=""
            className="w-full rounded-lg mb-3"
          />
          <div className="flex items-center bg-dark-700 rounded-lg p-2 space-x-3">
            <img
              src="https://via.placeholder.com/60x60"
              alt=""
              className="w-13 h-13 rounded-lg"
            />
            <div>
              <h1 className="text-white text-lg font-raleway">Esteban Dido</h1>
              <p className="text-gray-500 text-xs lg:text-sm font-raleway">
                Medellín, Antioquia
              </p>
              <p className="text-red-600 text-sm lg:text-base font-raleway">
                Tribales, Geometría, Puntillismo 3+...
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex'>
        <button className='text-white border border-white rounded-lg px-5 py-3 mx-auto mt-5 focus:outline-none'>Cargar Más</button>
      </div>
    </div>
  );
};

export default Artistas;
