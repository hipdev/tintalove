import Link from 'next/link';
import { TiLocationOutline } from 'react-icons/ti';
import { FiPlus } from 'react-icons/fi';
import { BsArrowLeft } from 'react-icons/bs';
import { BsArrowRight } from 'react-icons/bs';

const Home = () => {
  return (
    <div className='w-full h-auto bg-black'>
      <div className='flex px-5 sm:px-20 lg:px-5 xl:px-40'>
        <div className='flex flex-col justify-center w-full lg:w-54 h-99 lg:h-816'>
          <div className='flex items-center space-x-2'>
            <span className='text-3xl text-red-600'>
              <TiLocationOutline />
            </span>
            <Link href='/'>
              <a className='text-gray-500 font-raleway underline'>
                Medellín, Antioquia
              </a>
            </Link>
          </div>
          <div>
            <h1 className='text-white text-4xxl sm:text-5xl font-bold font-raleway leading-tight mb-10'>
              Artistas altamente creativos y profesionales
            </h1>
            <div className='w-full sm:w-4/5 flex mb-6'>
              <input
                type='text'
                placeholder='Busca tatuajes o artistas'
                className='w-full md:w-1/2 lg:w-96 xl:w-3/4 p-3 rounded-l-lg focus:outline-none'
              />
              <button
                type='submit'
                className='text-white bg-red-600 px-5 py-3 rounded-r-lg focus:outline-none tracking-wide'
              >
                Buscar
              </button>
            </div>
            <div className='w-full flex flex-wrap items-center'>
              <Link href='/'>
                <a className='inline-block text-white bg-dark-700 px-4 py-2 mr-3 rounded-full mb-2'>
                  Estilos
                </a>
              </Link>
              <Link href='/'>
                <a className='inline-block text-white bg-dark-700 px-4 py-2 mr-3 rounded-full mb-2'>
                  Sombras
                </a>
              </Link>
              <Link href='/'>
                <a className='inline-block text-white bg-dark-700 px-4 py-2 mr-3 rounded-full mb-2'>
                  Color
                </a>
              </Link>
              <Link href='/'>
                <a className='inline-block text-white bg-dark-700 px-4 py-2 mr-3 rounded-full mb-2'>
                  Puntos
                </a>
              </Link>
              <Link href='/'>
                <a className=' inline-block text-2xl text-white bg-dark-700 p-2 rounded-full mb-2'>
                  <FiPlus />
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className='w-1/2 hidden lg:flex flex-wrap justify-between items-end mb-4'>
          <div className=''>
            <button className='text-4xl text-white bg-red-600 pl-4 pr-3 py-3 rounded-l-lg'>
              <BsArrowLeft />
            </button>
            <button className='text-4xl text-white bg-red-600 pr-4 pl-3 py-3 rounded-r-lg mr-3'>
              <BsArrowRight />
            </button>
          </div>
          <div className='flex items-center text-white bg-gray-900 pl-4 rounded-lg space-x-5 cursor-pointer overflow-hidden'>
            <p>Artista: Daniel Castillo</p>
            <img src='https://via.placeholder.com/60x60' alt='' />
          </div>
        </div>
      </div>
      <div className='flex flex-wrap justify-center sm:justify-around bg-dark-700 h-auto sm:h-40 space-x-2 mb-8 sm:mb-20'>
        <div className='flex items-center'>
          <h1 className='text-3xl sm:text-4xxl text-white font-bold'>345</h1>
          <span className='text-white text-3xl font-bold -mt-4 pr-2'>+</span>
          <p className='text-gray-600 text-lg sm:text-xl font-bold -mt-4'>
            Artistas Disponibles
          </p>
        </div>
        <div className='flex items-center'>
          <h1 className='text-3xl sm:text-4xxl text-white font-bold'>20</h1>
          <span className='text-white text-3xl font-bold -mt-4 pr-2'>+</span>
          <p className='text-gray-600 text-lg sm:text-xl font-bold -mt-4'>
            Clientes felices
          </p>
        </div>
        <div className='flex items-center'>
          <h1 className='text-3xl sm:text-4xxl text-white font-bold'>10</h1>
          <span className='text-white text-3xl font-bold -mt-4 pr-2'>+</span>
          <p className='text-gray-600 text-lg sm:text-xl font-bold -mt-4'>
            Años de experiencia
          </p>
        </div>
      </div>
      <div className='px-5 sm:px-20 lg:px-24 xl:px-40'>
        <p className='text-red-600 font-raleway'>Estilos comunes</p>
        <h1 className='text-white text-4xxl font-bold font-raleway'>
          Encuentra inspiración
        </h1>
        <div className='flex items-center border-t-2 border-gray-500'>
          <div className='w-full flex justify-between items-center my-2'>
            <div className='truncate'>
              <Link href='/'>
                <a className='text-white mr-12'>Todos</a>
              </Link>
              <Link href='/'>
                <a className='text-white mr-12'>Geometrico</a>
              </Link>
              <Link href='/'>
                <a className='text-white mr-12'>Puntillismo</a>
              </Link>
              <Link href='/'>
                <a className='text-white mr-12'>Acuarela</a>
              </Link>
              <Link href='/'>
                <a className='text-white mr-12'>Realismo</a>
              </Link>
              <Link href='/'>
                <a className='text-white mr-12'>Anime</a>
              </Link>
              <Link href='/'>
                <a className='text-white mr-12'>Floral</a>
              </Link>
              <Link href='/'>
                <a className='text-white mr-12'>Lineas</a>
              </Link>
              <Link href='/'>
                <a className='text-white mr-12'>Tribal</a>
              </Link>
              <Link href='/'>
                <a className='text-white mr-12'>Monocromatico</a>
              </Link>
            </div>
            <div className='flex'>
              <button className='text-4xl text-white transition duration-500 ease-in-out hover:bg-red-600 pl-3 sm:pl-4 pr-2 sm:pr-3 py-1 sm:py-2 rounded-l-lg focus:outline-none'>
                <BsArrowLeft />
              </button>
              <button className='text-4xl text-white transition duration-500 ease-in-out hover:bg-red-600 pr-3 sm:pr-4 pl-2 sm:pl-3 py-1 sm:py-2 rounded-r-lg focus:outline-none'>
                <BsArrowRight />
              </button>
            </div>
          </div>
        </div>
        <div className='mb-24'>
          <div className='w-full grid grid-cols-3 lg:grid-cols-6 grid-rows-3 gap-2 lg:gap-3 xl:gap-4 h-auto mb-4'>
            <div className='col-span-2 row-span-2'>
              <img
                src='https://via.placeholder.com/388x388'
                alt=''
                className='w-full rounded-lg'
              />
            </div>
            <div className='w-full flex'>
              <img
                src='https://via.placeholder.com/186x186'
                alt=''
                className='w-full rounded-lg'
              />
            </div>
            <div>
              <img
                src='https://via.placeholder.com/186x186'
                alt=''
                className='w-full rounded-lg'
              />
            </div>
            <div>
              <img
                src='https://via.placeholder.com/186x186'
                alt=''
                className='w-full rounded-lg'
              />
            </div>
            <div>
              <img
                src='https://via.placeholder.com/186x186'
                alt=''
                className='w-full rounded-lg'
              />
            </div>
            <div>
              <img
                src='https://via.placeholder.com/186x186'
                alt=''
                className='w-full rounded-lg'
              />
            </div>
            <div>
              <img
                src='https://via.placeholder.com/186x186'
                alt=''
                className='w-full rounded-lg'
              />
            </div>
            <div className='col-span-2 row-span-2'>
              <img
                src='https://via.placeholder.com/388x388'
                alt=''
                className='w-full rounded-lg'
              />
            </div>
            <div>
              <img
                src='https://via.placeholder.com/186x186'
                alt=''
                className='w-full rounded-lg'
              />
            </div>
            <div>
              <img
                src='https://via.placeholder.com/186x186'
                alt=''
                className='w-full rounded-lg'
              />
            </div>
            <div>
              <img
                src='https://via.placeholder.com/186x186'
                alt=''
                className='w-full rounded-lg'
              />
            </div>
            <div>
              <img
                src='https://via.placeholder.com/186x186'
                alt=''
                className='w-full rounded-lg'
              />
            </div>
          </div>
          <div className='flex'>
            <button className='text-white border border-white rounded-lg px-5 py-3 mx-auto focus:outline-none'>
              Cargar Más
            </button>
          </div>
        </div>
      </div>
      <div className='flex h-610'>
        <div className='flex flex-col justify-center w-full lg:w-47 bg-dark-700 pl-10 sm:pl-20 xl:pl-32 pr-20 py-8'>
          <p className='text-red-600 font-raleway'>
            La nueva manera de encontrar artistas en Colombia
          </p>
          <h1 className='text-3xl sm:text-4xxl text-white font-bold font-raleway mb-10 tracking-wide'>
            Fácil, Rápido y Confiable
          </h1>
          <div className='flex space-x-6 mb-4 sm:mb-20'>
            <img
              src='https://via.placeholder.com/45x57'
              alt=''
              className='flex-shrink-0 w-13 h-20'
            />
            <div>
              <p className='font-raleway text-white w-auto sm:w-60 mb-28'>
                Busca entre cientos de artistas y estilos disponibles
              </p>
              <div className='w-20 border-b-2 border-red-600'></div>
            </div>
          </div>
          <div className='flex self-start sm:self-center lg:self-start space-x-6 mb-4 sm:mb-20'>
            <img
              src='https://via.placeholder.com/45x57'
              alt=''
              className='flex-shrink-0 w-13 h-20'
            />
            <div>
              <p className='font-raleway text-white w-auto sm:w-60 mb-28'>
                Encuentra el artista idóneo para el diseño que quieres
              </p>
              <div className='w-20 border-b-2 border-red-600'></div>
            </div>
          </div>
          <div className='flex self-start sm:self-end lg:self-start space-x-6'>
            <img
              src='https://via.placeholder.com/45x57'
              alt=''
              className='flex-shrink-0 w-13 h-20'
            />
            <div>
              <p className='font-raleway text-white w-auto sm:w-48 mb-28'>
                Agenda tu cita y listo! Comparte tu tatuaje
              </p>
              <div className='w-20 border-b-2 border-red-600'></div>
            </div>
          </div>
        </div>
        <img
          src='https://via.placeholder.com/786x610'
          alt=''
          className='w-54 xl:w-3/5 h-auto object-cover hidden lg:block'
        />
      </div>
      <div className='flex flex-col justify-center items-center h-75'>
        <div className='flex flex-col items-center px-3 sm:px-0'>
          <h1 className='text-4xxl text-white font-bold font-raleway mb-1'>
            ¿Eres un artista?
          </h1>
          <p className='text-gray-500 text-center mb-5'>
            Únete a nuestra plataforma y se encontrado por clientes potenciales
          </p>
          <button className='text-white bg-red-600 font-raleway px-4 py-2 rounded-lg'>
            Regístrate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
