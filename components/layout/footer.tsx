import Link from 'next/link'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaFacebookSquare } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="flex w-full h-auto xl:h-24 py-5 bg-dark-800">
      <div className="flex flex-col lg:flex-row w-full justify-between items-center px-8 sm:px-20 md:px-40">
        <div className="w-48 lg:w-60 mb-3 lg:mb-0">
          <Link href="/">
            <a className="relative flex items-center">
              <img className="w-48 relative top-2" src="/newlogo.png" />
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
  )
}

export default Footer
