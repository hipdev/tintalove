import { FiInstagram } from 'react-icons/fi'
import { AiFillFacebook } from 'react-icons/ai'
import { FaTwitter } from 'react-icons/fa'
import { RiCalendarLine } from 'react-icons/ri'
import { RiRoadMapLine } from 'react-icons/ri'
import { FiClock } from 'react-icons/fi'
import { BsBookmarkPlus } from 'react-icons/bs'
import Link from 'next/link'

const ProfileArtist = () => {
  return (
    <div className="bg-dark-500 h-auto">
      <div className="mx-16 pt-32">
        <div className="flex gap-8">
          <div className="fixed w-80 flex-shrink-0 self-center lg:self-start rounded-lg overflow-hidden mb-5 lg:mb-0">
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
                  <p className="text-light-500 text-xs">
                    Disponible en 2 meses
                  </p>
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
              <button className="btn-primary font-light text-xs tracking-wide py-4 w-full focus:outline-none">
                CONTÁCTAME
              </button>
              <button className="absolute top-0 right-0 -mt-6 mr-5 w-12 h-12 flex justify-center items-center text-white text-2xl bg-red-600 rounded-full focus:outline-none">
                <span>
                  <BsBookmarkPlus />
                </span>
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col ml-650">
            <div>
              <h1 className="text-white text-2xl font-semibold tracking-wide mb-4">
                Acerca de mi
              </h1>
              <p className="text-gray-400 w-2/3 mb-10">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Repellat, animi cupiditate perspiciatis velit fuga in quasi
                nobis debitis qui expedita similique, omnis ipsam optio
                quibusdam vero minima, beatae autem accusamus nulla. Sed
                architecto illo et distinctio vero, nostrum reiciendis, sint
                voluptatum totam aliquam ducimus neque vitae odio minus,
                assumenda quis.
              </p>
            </div>
            <div className="w-full flex flex-wrap gap-x-6">
              <Link href="#">
                <a className="text-white flex-shrink-0">TODOS LOS ESTILOS</a>
              </Link>
              <Link href="#">
                <a className="text-white">COLOR</a>
              </Link>
              <Link href="#">
                <a className="text-white flex-shrink-0">NUEVA ESCUELA</a>
              </Link>
              <Link href="#">
                <a className="text-white">COLOR</a>
              </Link>
              <Link href="#">
                <a className="text-white">MAORI</a>
              </Link>
              <Link href="#">
                <a className="text-white">REALISMO</a>
              </Link>
              <Link href="#">
                <a className="text-white">PUNTILLISMO</a>
              </Link>
              <Link href="#">
                <a className="text-white">SOMBRAS</a>
              </Link>
            </div>
            <div className="border-b-2 border-gray-500 w-full h-1 mb-5"></div>
            <div className="flex gap-5">
              <div className="w-full h-full">
                <div className="overflow-hidden rounded-xl mb-5">
                  <img
                    src="galaxy3.jpg"
                    alt=""
                    className="object-cover rounded-xl transition duration-700 ease-in-out transform hover:transform hover:scale-125"
                  />
                </div>
                <div className="overflow-hidden rounded-xl mb-5">
                  <img
                    src="galaxy2.jpg"
                    alt=""
                    className="object-cover rounded-xl transition duration-700 ease-in-out transform hover:transform hover:scale-125"
                  />
                </div>
                <div className="overflow-hidden rounded-xl mb-5">
                  <img
                    src="galaxy1.jpg"
                    alt=""
                    className="object-cover rounded-xl transition duration-700 ease-in-out transform hover:transform hover:scale-125"
                  />
                </div>
              </div>
              <div className="w-full h-full">
                <div className="overflow-hidden rounded-xl mb-5">
                  <img
                    src="galaxy3.jpg"
                    alt=""
                    className="object-cover rounded-xl transition duration-700 ease-in-out transform hover:transform hover:scale-125"
                  />
                </div>
                <div className="overflow-hidden rounded-xl mb-5">
                  <img
                    src="galaxy6.jpg"
                    alt=""
                    className="object-cover rounded-xl transition duration-700 ease-in-out transform hover:transform hover:scale-125"
                  />
                </div>
                <div className="overflow-hidden rounded-xl mb-5">
                  <img
                    src="galaxy4.jpg"
                    alt=""
                    className="object-cover rounded-xl transition duration-700 ease-in-out transform hover:transform hover:scale-125"
                  />
                </div>
              </div>
              <div className="w-full h-full">
                <div className="overflow-hidden rounded-xl mb-5">
                  <img
                    src="galaxy5.jpg"
                    alt=""
                    className="object-cover rounded-xl transition duration-700 ease-in-out transform hover:transform hover:scale-125"
                  />
                </div>
                <div className="overflow-hidden rounded-xl mb-5">
                  <img
                    src="galaxy2.jpg"
                    alt=""
                    className="object-cover rounded-xl transition duration-700 ease-in-out transform hover:transform hover:scale-125"
                  />
                </div>
                <div className="overflow-hidden rounded-xl mb-5">
                  <img
                    src="galaxy3.jpg"
                    alt=""
                    className="object-cover rounded-xl transition duration-700 ease-in-out transform hover:transform hover:scale-125"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileArtist
