import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';
import { GoSearch } from 'react-icons/go';
import { TiLocationOutline } from 'react-icons/ti';
import { MdFilterList } from 'react-icons/md';
import { FaRegCommentDots } from 'react-icons/fa';
import { RiHeartLine } from 'react-icons/ri';

const Home = () => {
  return (
    <div className='w-full h-auto bg-black'>
      <div className='h-1/4 flex flex-col justify-center items-center'>
        <h1 className='w-11/12 xl:w-2/5 text-white text-center text-4xl sm:text-5xl font-bold font-raleway leading-tight mt-20 sm:mt-24 mb-10'>
          Artistas altamente creativos y profesionales
        </h1>
        <div className='relative w-full md:w-2/4 lg:w-2/5 xl:w-2/6 flex justify-center items-center mb-6 px-3'>
          <div className='absolute left-3 flex items-center pointer-events-none p-3'>
            <span className='text-black text-xl sm:text-2xl'>
              <GoSearch />
            </span>
          </div>
          <input
            type='text'
            placeholder='Busca tatuajes o artistas'
            className='w-full py-3 pl-12 md:pl-14 rounded-l-lg focus:outline-none placeholder-black'
          />
          <button
            type='submit'
            className='text-white bg-red-600 px-5 py-3 rounded-r-lg focus:outline-none tracking-wide'
          >
            Buscar
          </button>
        </div>
        <div className='w-full flex flex-wrap justify-center items-center mb-16 sm:mb-24'>
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
            <a className='inline-block text-2xl text-white bg-dark-700 p-2 rounded-full mb-2'>
              <FiPlus />
            </a>
          </Link>
        </div>
      </div>
      <div className='px-5 sm:px-10 lg:px-20'>
        <div className='flex flex-wrap justify-center sm:justify-between mb-6'>
          <div className='flex items-center space-x-2 mb-3 sm:mb-0 mr-3'>
            <span className='text-red-600 text-3xl'>
              <TiLocationOutline />
            </span>
            <Link href='/'>
              <a className='text-white font-raleway underline'>
                Medellín, Antioquia
              </a>
            </Link>
          </div>
          <div className='flex space-x-5'>
            <select className='text-white font-raleway border border-light-700 p-3 rounded-lg bg-transparent focus:outline-none'>
              <option value=''>Popular</option>
            </select>
            <button className='flex items-center text-white font-raleway border border-light-700 px-5 py-3 rounded-lg focus:outline-none'>
              <span className='mr-2 text-xl'>
                <MdFilterList />
              </span>
              Filtros
            </button>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8'>
          <div>
            <img
              src='https://via.placeholder.com/309x234'
              alt=''
              className='w-full rounded-lg mb-1'
            />
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-red-600 rounded-full'></div>
                <p className='text-white text-sm font-raleway'>
                  Julián Álvarez
                </p>
              </div>
              <div className='flex space-x-5'>
                <div className='flex items-center space-x-2 text-white'>
                  <span>
                    <FaRegCommentDots />
                  </span>
                  <p className='font-raleway'>10</p>
                </div>
                <div className='flex items-center space-x-2 text-white'>
                  <span>
                    <RiHeartLine />
                  </span>
                  <p className='font-raleway'>53</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src='https://via.placeholder.com/309x234'
              alt=''
              className='w-full rounded-lg mb-1'
            />
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-red-600 rounded-full'></div>
                <p className='text-white text-sm font-raleway'>Opio Studio</p>
                <button className='text-white text-xs font-raleway font-thin tracking-wide bg-light-900 px-2 py-1 rounded-md focus:outline-none'>
                  ESTUDIO
                </button>
              </div>
              <div className='flex space-x-5'>
                <div className='flex items-center space-x-2 text-white'>
                  <span>
                    <FaRegCommentDots />
                  </span>
                  <p className='font-raleway'>10</p>
                </div>
                <div className='flex items-center space-x-2 text-white'>
                  <span>
                    <RiHeartLine />
                  </span>
                  <p className='font-raleway'>53</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src='https://via.placeholder.com/309x234'
              alt=''
              className='w-full rounded-lg mb-1'
            />
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-red-600 rounded-full'></div>
                <p className='text-white text-sm font-raleway'>Esteban Dido</p>
              </div>
              <div className='flex space-x-5'>
                <div className='flex items-center space-x-2 text-white'>
                  <span>
                    <FaRegCommentDots />
                  </span>
                  <p className='font-raleway'>10</p>
                </div>
                <div className='flex items-center space-x-2 text-white'>
                  <span>
                    <RiHeartLine />
                  </span>
                  <p className='font-raleway'>53</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src='https://via.placeholder.com/309x234'
              alt=''
              className='w-full rounded-lg mb-1'
            />
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-red-600 rounded-full'></div>
                <p className='text-white text-sm font-raleway'>Jorge Nitales</p>
              </div>
              <div className='flex space-x-5'>
                <div className='flex items-center space-x-2 text-white'>
                  <span>
                    <FaRegCommentDots />
                  </span>
                  <p className='font-raleway'>10</p>
                </div>
                <div className='flex items-center space-x-2 text-white'>
                  <span>
                    <RiHeartLine />
                  </span>
                  <p className='font-raleway'>53</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src='https://via.placeholder.com/309x234'
              alt=''
              className='w-full rounded-lg mb-1'
            />
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-red-600 rounded-full'></div>
                <p className='text-white text-sm font-raleway'>
                  Julián Álvarez
                </p>
              </div>
              <div className='flex space-x-5'>
                <div className='flex items-center space-x-2 text-white'>
                  <span>
                    <FaRegCommentDots />
                  </span>
                  <p className='font-raleway'>10</p>
                </div>
                <div className='flex items-center space-x-2 text-white'>
                  <span>
                    <RiHeartLine />
                  </span>
                  <p className='font-raleway'>53</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src='https://via.placeholder.com/309x234'
              alt=''
              className='w-full rounded-lg mb-1'
            />
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-red-600 rounded-full'></div>
                <p className='text-white text-sm font-raleway'>
                  Juliana Álvarez
                </p>
              </div>
              <div className='flex space-x-5'>
                <div className='flex items-center space-x-2 text-white'>
                  <span>
                    <FaRegCommentDots />
                  </span>
                  <p className='font-raleway'>10</p>
                </div>
                <div className='flex items-center space-x-2 text-white'>
                  <span>
                    <RiHeartLine />
                  </span>
                  <p className='font-raleway'>53</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src='https://via.placeholder.com/309x234'
              alt=''
              className='w-full rounded-lg mb-1'
            />
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-red-600 rounded-full'></div>
                <p className='text-white text-sm font-raleway'>Esteban Dido</p>
              </div>
              <div className='flex space-x-5'>
                <div className='flex items-center space-x-2 text-white'>
                  <span>
                    <FaRegCommentDots />
                  </span>
                  <p className='font-raleway'>10</p>
                </div>
                <div className='flex items-center space-x-2 text-white'>
                  <span>
                    <RiHeartLine />
                  </span>
                  <p className='font-raleway'>53</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src='https://via.placeholder.com/309x234'
              alt=''
              className='w-full rounded-lg mb-1'
            />
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-red-600 rounded-full'></div>
                <p className='text-white text-sm font-raleway'>Jorge Nitales</p>
              </div>
              <div className='flex space-x-5'>
                <div className='flex items-center space-x-2 text-white'>
                  <span>
                    <FaRegCommentDots />
                  </span>
                  <p className='font-raleway'>10</p>
                </div>
                <div className='flex items-center space-x-2 text-white'>
                  <span>
                    <RiHeartLine />
                  </span>
                  <p className='font-raleway'>53</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src='https://via.placeholder.com/309x234'
              alt=''
              className='w-full rounded-lg mb-1'
            />
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-red-600 rounded-full'></div>
                <p className='text-white text-sm font-raleway'>
                  Julián Álvarez
                </p>
              </div>
              <div className='flex space-x-5'>
                <div className='flex items-center space-x-2 text-white'>
                  <span>
                    <FaRegCommentDots />
                  </span>
                  <p className='font-raleway'>10</p>
                </div>
                <div className='flex items-center space-x-2 text-white'>
                  <span>
                    <RiHeartLine />
                  </span>
                  <p className='font-raleway'>53</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src='https://via.placeholder.com/309x234'
              alt=''
              className='w-full rounded-lg mb-1'
            />
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-red-600 rounded-full'></div>
                <p className='text-white text-sm font-raleway'>
                  Juliana Álvarez
                </p>
              </div>
              <div className='flex space-x-5'>
                <div className='flex items-center space-x-2 text-white'>
                  <span>
                    <FaRegCommentDots />
                  </span>
                  <p className='font-raleway'>10</p>
                </div>
                <div className='flex items-center space-x-2 text-white'>
                  <span>
                    <RiHeartLine />
                  </span>
                  <p className='font-raleway'>53</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src='https://via.placeholder.com/309x234'
              alt=''
              className='w-full rounded-lg mb-1'
            />
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-red-600 rounded-full'></div>
                <p className='text-white text-sm font-raleway'>Esteban Dido</p>
              </div>
              <div className='flex space-x-5'>
                <div className='flex items-center space-x-2 text-white'>
                  <span>
                    <FaRegCommentDots />
                  </span>
                  <p className='font-raleway'>10</p>
                </div>
                <div className='flex items-center space-x-2 text-white'>
                  <span>
                    <RiHeartLine />
                  </span>
                  <p className='font-raleway'>53</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src='https://via.placeholder.com/309x234'
              alt=''
              className='w-full rounded-lg mb-1'
            />
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-red-600 rounded-full'></div>
                <p className='text-white text-sm font-raleway'>Jorge Nitales</p>
              </div>
              <div className='flex space-x-5'>
                <div className='flex items-center space-x-2 text-white'>
                  <span>
                    <FaRegCommentDots />
                  </span>
                  <p className='font-raleway'>10</p>
                </div>
                <div className='flex items-center space-x-2 text-white'>
                  <span>
                    <RiHeartLine />
                  </span>
                  <p className='font-raleway'>53</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex h-609 mt-20'>
        <div className='flex flex-col justify-center w-full lg:w-3/4 bg-dark-700 pl-10 sm:pl-20 xl:pl-32 pr-20 py-8'>
          <p className='text-red-600 font-raleway mb-2'>
            La nueva manera de encontrar artistas en Colombia
          </p>
          <h1 className='text-4xl xl:text-5xl text-white font-bold font-raleway mb-10 tracking-wide'>
            Fácil, Rápido y Confiable
          </h1>
          <div className='flex space-x-6 mb-4 sm:mb-20'>
            <img
              src='https://via.placeholder.com/45x57'
              alt=''
              className='flex-shrink-0 h-20'
            />
            <div>
              <p className='font-raleway text-white w-auto sm:w-60 mb-5'>
                Busca entre cientos de artistas y estilos disponibles
              </p>
              <div className='w-20 border-b-2 border-red-600'></div>
            </div>
          </div>
          <div className='flex self-start sm:self-center lg:self-start space-x-6 mb-4 sm:mb-20'>
            <img
              src='https://via.placeholder.com/45x57'
              alt=''
              className='flex-shrink-0 h-20'
            />
            <div>
              <p className='font-raleway text-white w-auto sm:w-60 mb-5'>
                Encuentra el artista idóneo para el diseño que quieres
              </p>
              <div className='w-20 border-b-2 border-red-600'></div>
            </div>
          </div>
          <div className='flex self-start sm:self-end lg:self-start space-x-6'>
            <img
              src='https://via.placeholder.com/45x57'
              alt=''
              className='flex-shrink-0 h-20'
            />
            <div>
              <p className='font-raleway text-white w-auto sm:w-48 mb-5'>
                Agenda tu cita y listo! Comparte tu tatuaje
              </p>
              <div className='w-20 border-b-2 border-red-600'></div>
            </div>
          </div>
        </div>
        <div className="w-full h-full hidden lg:block">
          <img
          src='https://via.placeholder.com/786x610'
          alt=''
          className='w-full h-full object-cover'
          />
        </div>
      </div>
      <div className='flex flex-col justify-center items-center h-72 sm:h-80 mt-16'>
        <div className='flex flex-col items-center text-center px-3 sm:px-0'>
          <h1 className='text-4xl sm:text-5xl text-white font-bold font-raleway mb-2'>
            ¿Eres un artista?
          </h1>
          <p className='text-light-700 text-center mb-5'>
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
