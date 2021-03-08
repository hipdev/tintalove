import { CgClose } from "react-icons/cg";
import { FiInstagram } from "react-icons/fi";
import { AiFillFacebook } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { RiCalendarLine } from "react-icons/ri";
import { RiRoadMapLine } from "react-icons/ri";
import { FiClock } from "react-icons/fi";
import { HiArrowNarrowRight } from "react-icons/hi";
import { FaRegCommentDots } from "react-icons/fa";
import { RiHeartLine } from "react-icons/ri";
import { BsBookmarkPlus } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import Link from "next/link";

const Post = () => {
  return(
    <div className="w-full bg-dark-700 bg-opacity-75 relative">
      <div className="mx-5 sm:mx-20 md:mx-40 lg:mx-48 pt-6">
        <div className="flex flex-wrap justify-center lg:justify-between mb-8">
          <div className="flex flex-wrap justify-center space-x-5 mb-4 lg:mb-0 mt-8 sm:mt-0 mr-0 md:mr-1">
            <div className="mb-3 sm:mb-0">
              <h1 className="text-white text-2xl sm:text-xl font-semibold font-raleway tracking-wide">Daniela Castillo</h1>
              <h6 className="text-light-700 text-xs">Medellín, Antioquia</h6>
            </div>
            <button className="btn-red px-5 py-3 tracking-wide mb-3 sm:mb-0">Contáctame</button>
          </div>
          <div className="flex flex-col">
            <h1 className="text-white text-xl font-semibold font-raleway tracking-wide">Tatuaje realista de payaso loco</h1>
            <p className="text-light-700 text-xs self-end">#Realismo #Color #Payaso #Retrato</p>
          </div>
          <span className="absolute top-3 sm:top-8 lg:top-9 right-5 sm:right-16 lg:right-28 text-3xl text-white"><CgClose /></span>
        </div>
        <div className="mb-5 h-1/2 sm:h-672">
          <img src="https://via.placeholder.com/1100x621" alt="" className="w-full h-full object-cover rounded-lg"/>
        </div>
        <div className="flex flex-col-reverse lg:flex-row justify-between mb-10">
          <div>
            <div className="flex justify-center lg:justify-start space-x-3 sm:space-x-5 mb-5">
              <input type="text" placeholder="Escribe algo..." className="w-3/5 bg-transparent border border-light-700 px-5 py-3 rounded-lg focus:outline-none"/>
              <button className="btn-red px-4 py-3">Comentar</button>
            </div>
            <div className="w-4/5 flex space-x-4 mb-3">
              <div className="flex-shrink-0">
                <img src="https://via.placeholder.com/45x45" alt="" className="rounded-lg"/>
              </div>
              <div>
                <div className="flex items-center space-x-3">
                  <h4 className="text-white font-raleway font-semibold tracking-wide">Daniel Castillo</h4>
                  <p className="text-light-700 text-xs">24 de Marzo</p>
                </div>
                <p className="text-light-700 text-sm">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,</p>
              </div>
            </div>
            <div className="w-4/5 flex space-x-4 mb-3">
              <div className="flex-shrink-0">
                <img src="https://via.placeholder.com/45x45" alt="" className="rounded-lg"/>
              </div>
              <div>
                <div className="flex items-center space-x-3">
                  <h4 className="text-white font-raleway font-semibold tracking-wide">Daniel Castillo</h4>
                  <p className="text-light-700 text-xs">24 de Marzo</p>
                </div>
                <p className="text-light-700 text-sm">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,</p>
              </div>
            </div>
            <div className="w-4/5 flex space-x-4 mb-3">
              <div className="flex-shrink-0">
                <img src="https://via.placeholder.com/45x45" alt="" className="rounded-lg"/>
              </div>
              <div>
                <div className="flex items-center space-x-3">
                  <h4 className="text-white font-raleway font-semibold tracking-wide">Daniel Castillo</h4>
                  <p className="text-light-700 text-xs">24 de Marzo</p>
                </div>
                <p className="text-light-700 text-sm">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,</p>
              </div>
            </div>
            <button className="text-white font-raleway border border-light-700 px-4 py-1 rounded-lg mb-2 mr-2 focus:outline-none">Cargar más</button>
          </div>
          <div className="flex-shrink-0 self-center lg:self-start rounded-lg overflow-hidden mb-5 lg:mb-0">
            <div className="w-80 xl:w-96 h-auto bg-dark-700 px-10 xl:px-13 pt-10 pb-8 rounded-b-lg">
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <img src="https://via.placeholder.com/45x45" alt="" className="rounded-lg"/>
                </div>
                <div>
                  <h1 className="text-white text-xl font-semibold font-raleway tracking-wide">Daniela Castillo</h1>
                  <h6 className="text-light-700 text-xs">Medellín, Antioquia</h6>
                </div>
              </div>
              <div className="flex space-x-4 my-4">
                <Link href="#"><a><span className="text-2xl text-light-700"><FiInstagram /></span></a></Link>
                <Link href="#"><a><span className="text-2xl text-light-700"><AiFillFacebook /></span></a></Link>
                <Link href="#"><a><span className="text-2xl text-light-700"><FaTwitter /></span></a></Link>
              </div>
              <div>
                <div className="flex space-x-2">
                  <span className="text-light-500"><RiCalendarLine /></span>
                  <p className="text-light-500 text-xs">Disponible en 2 meses</p>
                </div>
                <div className="flex space-x-2 my-2">
                  <span className="text-light-500"><RiRoadMapLine /></span>
                  <p className="text-light-500 text-xs">Cómo llegar</p>
                </div>
                <div className="flex space-x-2 mb-5">
                  <span className="text-light-500"><FiClock /></span>
                  <p className="text-light-500 text-xs">Lunes a viernes, de 10am - 7pm
                  <br/>
                  Sábados, Domingos y Festivos 10:00am 1:00pm</p>
                </div>
              </div>
              <button className="btn-red py-3 font-light tracking-wide w-full focus:outline-none">Contáctame</button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed top-12 sm:top-6 left-4 md:left-20 lg:left-28 z-10">
          <Link href="#">
            <a>
              <div className="w-12 h-12 bg-light-900 rounded-lg mb-8 overflow-hidden">
                <img src="https://via.placeholder.com/45x45" alt="" className="w-full"/>
              </div>
            </a>
          </Link>
          <button className="block mb-2">
            <div className="flex justify-center items-center w-12 h-12 bg-light-900 rounded-lg">
              <span className="text-3xl text-white"><BsBookmarkPlus /></span>
            </div>
            <p className="text-sm font-raleway text-white">Guardar</p>
          </button>
          <button className="block mb-2">
            <div className="flex flex-col justify-center items-center w-12 h-12 bg-light-900 rounded-lg">
              <span className="text-2xl text-white"><RiHeartLine /></span>
              <p className="text-xs text-white font-raleway">74</p>
            </div>
            <p className="text-sm font-raleway text-white">Valorar</p>
          </button>
          <button className="block mb-2">
            <div className="flex flex-col justify-center items-center w-12 h-12 bg-light-900 rounded-lg">
              <span className="text-2xl text-white"><FaRegCommentDots /></span>
              <p className="text-xs text-white font-raleway">10</p>
            </div>
            <p className="text-sm -ml-2 font-raleway text-white">Comentar</p>
          </button>
          <button className="block mb-2">
            <div className="flex flex-col justify-center items-center w-12 h-12 bg-light-900 rounded-lg">
              <span className="text-2xl text-white"><FiSend /></span>
            </div>
            <p className="text-sm -ml-2 font-raleway text-white">Compartir</p>
          </button>
      </div>
      <div className="relative w-full px-6 sm:px-14 z-20">
        <div className="border-t border-b border-light-700 py-5">
          <div className="flex flex-wrap justify-center sm:justify-between mb-5">
            <h1 className="text-white text-xl font-semibold font-raleway tracking-wide">Más de Daniela Castillo</h1>
            <button className="flex items-center text-white font-raleway tracking-wide">Visitar perfil <span className="text-red-600 text-2xl pl-2"><HiArrowNarrowRight /></span></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            <div>
              <img src="https://via.placeholder.com/309x234" alt="" className="w-full rounded-lg mb-1" />
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-red-600 rounded-full"></div>
                  <p className="text-white text-sm font-raleway">Julián Álvarez</p>
                </div>
                <div className="flex space-x-5">
                  <div className="flex items-center space-x-2 text-white">
                    <span><FaRegCommentDots /></span>
                    <p className="font-raleway">10</p>
                  </div>
                  <div className="flex items-center space-x-2 text-white">
                    <span><RiHeartLine /></span>
                    <p className="font-raleway">53</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img src="https://via.placeholder.com/309x234" alt="" className="w-full rounded-lg mb-1" />
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-red-600 rounded-full"></div>
                  <p className="text-white text-sm font-raleway">Juliana Álvarez</p>
                </div>
                <div className="flex space-x-5">
                  <div className="flex items-center space-x-2 text-white">
                    <span><FaRegCommentDots /></span>
                    <p className="font-raleway">10</p>
                  </div>
                  <div className="flex items-center space-x-2 text-white">
                    <span><RiHeartLine /></span>
                    <p className="font-raleway">53</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img src="https://via.placeholder.com/309x234" alt="" className="w-full rounded-lg mb-1" />
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-red-600 rounded-full"></div>
                  <p className="text-white text-sm font-raleway">Esteban Dido</p>
                </div>
                <div className="flex space-x-5">
                  <div className="flex items-center space-x-2 text-white">
                    <span><FaRegCommentDots /></span>
                    <p className="font-raleway">10</p>
                  </div>
                  <div className="flex items-center space-x-2 text-white">
                    <span><RiHeartLine /></span>
                    <p className="font-raleway">53</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img src="https://via.placeholder.com/309x234" alt="" className="w-full rounded-lg mb-1" />
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-red-600 rounded-full"></div>
                  <p className="text-white text-sm font-raleway">Jorge Nitales</p>
                </div>
                <div className="flex space-x-5">
                  <div className="flex items-center space-x-2 text-white">
                    <span><FaRegCommentDots /></span>
                    <p className="font-raleway">10</p>
                  </div>
                  <div className="flex items-center space-x-2 text-white">
                    <span><RiHeartLine /></span>
                    <p className="font-raleway">53</p>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className="py-5">
            <h1 className="text-white text-xl font-semibold font-raleway tracking-wide mb-5">También te podría interesar</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
              <div>
                <img src="https://via.placeholder.com/309x234" alt="" className="w-full rounded-lg mb-1" />
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-red-600 rounded-full"></div>
                    <p className="text-white text-sm font-raleway">Julián Álvarez</p>
                  </div>
                  <div className="flex space-x-5">
                    <div className="flex items-center space-x-2 text-white">
                      <span><FaRegCommentDots /></span>
                      <p className="font-raleway">10</p>
                    </div>
                    <div className="flex items-center space-x-2 text-white">
                      <span><RiHeartLine /></span>
                      <p className="font-raleway">53</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img src="https://via.placeholder.com/309x234" alt="" className="w-full rounded-lg mb-1" />
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-red-600 rounded-full"></div>
                    <p className="text-white text-sm font-raleway">Juliana Álvarez</p>
                  </div>
                  <div className="flex space-x-5">
                    <div className="flex items-center space-x-2 text-white">
                      <span><FaRegCommentDots /></span>
                      <p className="font-raleway">10</p>
                    </div>
                    <div className="flex items-center space-x-2 text-white">
                      <span><RiHeartLine /></span>
                      <p className="font-raleway">53</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img src="https://via.placeholder.com/309x234" alt="" className="w-full rounded-lg mb-1" />
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-red-600 rounded-full"></div>
                    <p className="text-white text-sm font-raleway">Esteban Dido</p>
                  </div>
                  <div className="flex space-x-5">
                    <div className="flex items-center space-x-2 text-white">
                      <span><FaRegCommentDots /></span>
                      <p className="font-raleway">10</p>
                    </div>
                    <div className="flex items-center space-x-2 text-white">
                      <span><RiHeartLine /></span>
                      <p className="font-raleway">53</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img src="https://via.placeholder.com/309x234" alt="" className="w-full rounded-lg mb-1" />
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-red-600 rounded-full"></div>
                    <p className="text-white text-sm font-raleway">Jorge Nitales</p>
                  </div>
                  <div className="flex space-x-5">
                    <div className="flex items-center space-x-2 text-white">
                      <span><FaRegCommentDots /></span>
                      <p className="font-raleway">10</p>
                    </div>
                    <div className="flex items-center space-x-2 text-white">
                      <span><RiHeartLine /></span>
                      <p className="font-raleway">53</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="text-white font-raleway border border-light-700 px-4 py-1 rounded-lg mb-2 mr-2 focus:outline-none">Cargar más</button>
          </div>
      </div>
    </div>
  )
}

export default Post;