import { CgClose } from 'react-icons/cg'
import { FiInstagram } from 'react-icons/fi'
import { AiFillFacebook } from 'react-icons/ai'
import { FaTwitter } from 'react-icons/fa'
import { RiCalendarLine, RiMessengerLine } from 'react-icons/ri'
import { RiRoadMapLine } from 'react-icons/ri'
import { FiClock } from 'react-icons/fi'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { FaRegCommentDots } from 'react-icons/fa'
import { RiHeartLine } from 'react-icons/ri'
import { BsBookmark } from 'react-icons/bs'
import { FiSend } from 'react-icons/fi'
import Link from 'next/link'
import PostComment from './post-coment'

const Post = ({ postData, postId, artistData }) => {
  console.log(postData, 'la data del post')
  console.log(artistData, 'la data del artista')
  return (
    <div className="w-full bg-dark-800 bg-opacity-75 px-6 xl:px-36">
      <div className="mx-5 sm:mx-20 md:mx-40 lg:mx-48 pt-6">
        <div className="flex flex-wrap justify-center lg:justify-between mb-8">
          <div className="flex flex-wrap justify-center space-x-5 mb-4 lg:mb-0 mt-8 sm:mt-0 mr-0 md:mr-1">
            <div className="mb-3 sm:mb-0">
              <h1 className="text-white text-2xl sm:text-xl font-semibold font-raleway tracking-wide">
                {artistData.displayName || 'Sin nombre'}
              </h1>
              <h6 className="text-light-200 text-sm">
                {artistData.city_name || 'Sin ciudad'},{' '}
                {artistData.province || 'Sin departamento'}
              </h6>
            </div>
            <button className="flex items-center gap-3 btn-primary px-5 py-3 tracking-wide mb-3 sm:mb-0">
              <span className="text-2xl">
                <RiMessengerLine />
              </span>
              CONTÁCTAME
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col mb-2">
              <h1 className="text-white text-2xl font-semibold font-raleway tracking-wide">
                {postData.description || 'Sin descripción'}
              </h1>
              <p className="text-light-200 text-sm self-end">
                #Realismo #Color #Payaso #Retrato
              </p>
            </div>
            <span className="text-4xl text-white">
              <CgClose />
            </span>
          </div>
        </div>
        <div className="mb-5 h-1/2 sm:h-672">
          <img
            src="https://via.placeholder.com/1100x621"
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col-reverse lg:flex-row justify-between mb-10">
          <div className="mb-4 mr-3">
            <div className="flex justify-center lg:justify-start gap-2 mb-5">
              <input
                type="text"
                placeholder="Escribe algo..."
                className="w-3/5 bg-ocean_blue-200 border border-light-700 px-5 py-3 rounded-lg focus:outline-none"
              />
              <button className="flex items-center gap-2 btn-primary px-4 py-3">
                <span className="text-xl">
                  <FaRegCommentDots />
                </span>
                Comentar
              </button>
            </div>

            <PostComment />
            <PostComment />
            <PostComment />
          </div>
          <div className="flex-shrink-0 self-center lg:self-start rounded-lg overflow-hidden mb-5 lg:mb-0">
            <div className="w-80 xl:w-96 h-auto bg-ocean_blue-200 px-10 xl:px-13 pt-10 pb-8 rounded-b-lg">
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <img
                    src="https://via.placeholder.com/45x45"
                    alt=""
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <h1 className="text-white text-xl font-semibold font-raleway tracking-wide">
                    {artistData.displayName}
                  </h1>
                  <h6 className="text-light-200 text-xs">
                    {artistData.city_name}, {artistData.province}
                  </h6>
                </div>
              </div>
              <div className="flex space-x-4 my-4">
                <Link href="#">
                  <a>
                    <span className="text-2xl text-light-200">
                      <FiInstagram />
                    </span>
                  </a>
                </Link>
                <Link href="#">
                  <a>
                    <span className="text-2xl text-light-200">
                      <AiFillFacebook />
                    </span>
                  </a>
                </Link>
                <Link href="#">
                  <a>
                    <span className="text-2xl text-light-200">
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
                <div className="flex space-x-2">
                  <span className="text-light-500">
                    <FiClock />
                  </span>
                  <p className="text-light-500 text-xs mb-5">
                    {artistData.times}
                  </p>
                </div>
              </div>
              <button className="btn-primary py-3 font-light tracking-wide w-full focus:outline-none">
                Contáctame
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-12 sm:top-6 left-4 md:left-20 lg:left-64 z-10">
        <Link href="#">
          <a>
            <div className="w-14 h-14 bg-light-900 rounded-lg mb-6 overflow-hidden">
              <img
                src="https://via.placeholder.com/45x45"
                alt=""
                className="w-full"
              />
            </div>
          </a>
        </Link>

        <button className="block mb-2">
          <div className="flex flex-col justify-center items-center w-14 h-14 bg-light-900 rounded-lg">
            <span className="text-2xl text-white">
              <RiHeartLine />
            </span>
            <p className="text-xs text-white font-raleway">74</p>
          </div>
          <p className="text-atomico text-white tracking-wide">ME GUSTA</p>
        </button>
        <button className="block mb-2">
          <div className="flex flex-col justify-center items-center w-14 h-14 bg-light-900 rounded-lg">
            <span className="text-2xl text-white">
              <FaRegCommentDots />
            </span>
            <p className="text-xs text-white font-raleway">10</p>
          </div>
          <p className="text-atomico text-white tracking-wide">COMENTAR</p>
        </button>
        <button className="block mb-2">
          <div className="flex flex-col justify-center items-center w-14 h-14 bg-light-900 rounded-lg">
            <span className="text-2xl text-white">
              <FiSend />
            </span>
          </div>
          <p className="text-atomico text-white tracking-wide">COMPARTIR</p>
        </button>
      </div>
      <div className="w-full px-6 sm:px-14 pb-32">
        <div className="border-t-2 border-b-2 border-light-800 py-5">
          <div className="flex flex-wrap justify-center sm:justify-between mb-5">
            <h1 className="text-white text-xl font-semibold font-raleway tracking-wide">
              Más de {artistData.displayName}
            </h1>
            <button className="flex items-center text-white font-raleway tracking-wide">
              Visitar perfil
              <span className="text-green-600 text-2xl pl-2">
                <HiArrowNarrowRight />
              </span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            <div>
              <img
                src="https://via.placeholder.com/309x234"
                alt=""
                className="w-full rounded-lg mb-1"
              />
            </div>
            <div>
              <img
                src="https://via.placeholder.com/309x234"
                alt=""
                className="w-full rounded-lg mb-1"
              />
            </div>
            <div>
              <img
                src="https://via.placeholder.com/309x234"
                alt=""
                className="w-full rounded-lg mb-1"
              />
            </div>
            <div>
              <img
                src="https://via.placeholder.com/309x234"
                alt=""
                className="w-full rounded-lg mb-1"
              />
            </div>
          </div>
        </div>
        <div className="py-5">
          <div className="flex flex-wrap justify-center sm:justify-between mb-5">
            <h1 className="text-white text-xl font-semibold font-raleway tracking-wide">
              También podría interesarte
            </h1>
            <button className="flex items-center text-white font-raleway tracking-wide">
              Ver más
              <span className="text-green-600 text-2xl pl-2">
                <HiArrowNarrowRight />
              </span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            <div>
              <img
                src="https://via.placeholder.com/309x234"
                alt=""
                className="w-full rounded-lg mb-1"
              />
            </div>
            <div>
              <img
                src="https://via.placeholder.com/309x234"
                alt=""
                className="w-full rounded-lg mb-1"
              />
            </div>
            <div>
              <img
                src="https://via.placeholder.com/309x234"
                alt=""
                className="w-full rounded-lg mb-1"
              />
            </div>
            <div>
              <img
                src="https://via.placeholder.com/309x234"
                alt=""
                className="w-full rounded-lg mb-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
