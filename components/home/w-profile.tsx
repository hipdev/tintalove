import { BsArrowLeft } from 'react-icons/bs'
import Link from 'next/link'

const Profile = () => {
  return (
    <div className="bg-black px-5 sm:px-20 md:px-5 lg:px-0 xl:px-40 pt-16 pb-20">
      <div className="flex flex-col lg:flex-row w-auto h-auto space-x-0 lg:space-x-4 mb-20">
        <button className="text-white text-4xl bg-dark-700 p-4 rounded-lg self-start mb-3 sm:mb-0">
          <BsArrowLeft />
        </button>
        <img
          src="https://via.placeholder.com/186x186"
          alt=""
          className="w-48 h-48 rounded-lg mb-3 lg:mb-0 self-center lg:self-start"
        />
        <div className="w-full flex flex-col md:flex-row bg-dark-700 pl-5 md:pl-6 xl:pl-12 pr-5 md:pr-2 py-12 rounded-lg">
          <div className="w-auto md:w-1/2 xl:w-99 border-b-2 md:border-b-0 md:border-r-2 border-red-600 pr-0 md:pr-10 mr-0 md:mr-10 mb-4 md:mb-0">
            <h1 className="text-white text-xl text-center font-bold font-raleway mb-2 md:mb-0">
              Daniel Castillo
            </h1>
            <p className="text-sm text-gray-500 mb-3 md:mb-0">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea
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
            <button className="block text-white font-raleway bg-red-600 rounded-lg px-4 py-3 mt-8 mx-auto md:mx-0">
              Reserva tu cita
            </button>
          </div>
        </div>
      </div>
      <div className="px-0 md:px-5 lg:px-20 xl:px-0">
        <div className="flex items-center border-t-2 border-gray-500">
          <div className="w-full items-center my-2">
            <div className="">
              <Link href="/">
                <a className="text-sm sm:text-base text-white font-raleway mr-6 sm:mr-12 inline-block py-0 sm:py-4">
                  Todos
                </a>
              </Link>
              <Link href="/">
                <a className="text-sm sm:text-base text-white font-raleway mr-6 sm:mr-12 inline-block py-0 sm:py-4">
                  Geometrico
                </a>
              </Link>
              <Link href="/">
                <a className="text-sm sm:text-base text-white font-raleway mr-6 sm:mr-12 inline-block py-0 sm:py-4">
                  Puntillismo
                </a>
              </Link>
              <Link href="/">
                <a className="text-sm sm:text-base text-white font-raleway mr-6 sm:mr-12 inline-block py-0 sm:py-4">
                  Acuarela
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="mb-24">
          <div className="w-full grid grid-cols-3 lg:grid-cols-6 grid-rows-3 gap-2 lg:gap-3 xl:gap-4 h-auto mb-4">
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
  )
}

export default Profile
