import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';
import { GoSearch } from 'react-icons/go';
import { TiLocationOutline } from 'react-icons/ti';
import { MdFilterList } from 'react-icons/md';
import { FaRegCommentDots } from 'react-icons/fa';
import { RiHeartLine } from 'react-icons/ri';

const Home2 = () => {
  return (
    <div className='w-full h-auto bg-black'>
      <nav className='flex flex-col lg:flex-row px-2 sm:px-20 py-4 bg-dark-700'>
        <div className='w-full flex flex-wrap justify-center lg:justify-between items-center'>
          <div className='flex flex-wrap justify-center items-center'>
            <div className='w-176 mb-1'>
              <Link href=''>
                <a className='relative flex items-center'>
                  <div className='absolute top-0 left-0 mt-3125 ml-73 w-10 h-10 bg-red-600 rounded-full z-0'></div>
                  <h1 className='text-white text-3xl font-bold font-raleway ml-2 z-10'>
                    Tintalovers
                  </h1>
                </a>
              </Link>
            </div>
            <div className='w-full md:w-96 flex flex-wrap justify-evenly mb-2 lg:mb-0 py-4 md:py-0'>
              <Link href=''>
                <a className='text-white'>Tatuajes</a>
              </Link>
              <Link href=''>
                <a className='text-white'>Artistas</a>
              </Link>
              <Link href=''>
                <a className='text-white'>Soy un artista</a>
              </Link>
            </div>
          </div>
          <div className='flex items-center'>
            <span className='text-lg text-white'>
              <GoSearch />
            </span>
            <button className='w-1/2 sm:w-auto text-white px-5 py-3 mx-auto sm:mx-0 rounded-lg focus:outline-none'>
              Ingresar
            </button>
            <button className='btn-red px-5 py-3'>Registrate</button>
          </div>
        </div>
      </nav>
      <div className='h-512 flex flex-col justify-center items-center'>
        <h1 className='w-full sm:w-4/5 xl:w-35 text-white text-center text-4xl sm:text-5xl font-bold font-raleway leading-tight mb-10'>
          Artistas altamente creativos y profesionales
        </h1>
        <div className='relative sm:w-97 md:w-98 lg:w-99 flex justify-center items-center mb-6'>
          <div className='absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none'>
            <span className='text-black text-xl sm:text-2xl'>
              <GoSearch />
            </span>
          </div>
          <input
            type='text'
            placeholder='Busca tatuajes o artistas'
            className='block w-224 sm:w-97 md:w-98 lg:w-99 py-3 pl-8 sm:pl-12 rounded-l-lg focus:outline-none placeholder-black'
          />
          <button
            type='submit'
            className='text-white bg-red-600 px-5 py-3 rounded-r-lg focus:outline-none tracking-wide'
          >
            Buscar
          </button>
        </div>
        <div className='w-full flex flex-wrap justify-center items-center'>
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
                <button className='text-white text-xs font-raleway font-thin tracking-wide bg-light-900 px-2 rounded-md focus:outline-none'>
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
    </div>
  );
};

export default Home2;
