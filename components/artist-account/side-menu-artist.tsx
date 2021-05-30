import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineUser } from 'react-icons/ai'
import { BiPhoneCall } from 'react-icons/bi'

import { CgWorkAlt } from 'react-icons/cg'
import { FaRegUserCircle } from 'react-icons/fa'
import { FiPhoneCall } from 'react-icons/fi'
import { HiCamera } from 'react-icons/hi'

type Props = {
  uid?: string
  username: string
}

const SideMenuArtist = ({ uid, username }: Props) => {
  const router = useRouter()
  const [path] = router.route.split('/').slice(-1) // get last item from pathName

  return (
    <div className="mb-10 lg:mb-0 ">
      <div className="mb-10 mt-12 hidden sm:block">
        <p className="text-primary text-xl font-semibold">Estar en TintaLove</p>
        <h1 className="text-2xl text-white font-bold tracking-wide">
          Es mostrar tu talento
        </h1>
      </div>

      {username && (
        <Link href={`/${username}`}>
          <a className="mb-10  items-center text-white bg-primary px-4 py-2 rounded-sm hidden sm:inline-flex">
            Ver perfil
            <FaRegUserCircle className="text-xl ml-4" />
          </a>
        </Link>
      )}

      <div className="text-light-900 pr-7 hidden sm:block">
        <Link href="/artist/main-info">
          <a className={path == 'main-info' ? 'text-white' : ''}>
            <div className="pb-10 flex items-center justify-between">
              Información personal
              <FaRegUserCircle className="text-xl" />
            </div>
          </a>
        </Link>

        <Link href="/artist/working-info">
          <a className={path == 'working-info' ? 'text-white' : ''}>
            <div className="pb-10 flex items-center justify-between">
              Información laboral
              <CgWorkAlt className="text-xl" />
            </div>
          </a>
        </Link>

        <Link href="/artist/contact-info">
          <a className={path == 'contact-info' ? 'text-white' : ''}>
            <div className="pb-10 flex items-center justify-between">
              Información de Contacto
              <FiPhoneCall className="text-xl" />
            </div>
          </a>
        </Link>

        <Link href="/artist/pictures-info">
          <a className={path == 'pictures-info' ? 'text-white' : ''}>
            <div className="pb-10 flex items-center justify-between">
              Fotos de perfil
              <HiCamera className="text-xl" />
            </div>
          </a>
        </Link>
      </div>
      <nav className="flex bg-dark-500 z-40  fixed  bottom-0 w-full justify-evenly text-gray-200  sm:hidden">
        <Link href="/artist/main-info">
          <a className="text-2xl p-3 flex flex-col  items-center hover:text-primaryHover">
            <FaRegUserCircle className="text-xl" />
            <span className="text-white text-base hover:text-primaryHover font-semibold">
              1
            </span>
          </a>
        </Link>
        <Link href="/artist/working-info">
          <a className="text-2xl p-3 flex flex-col text-light-200  items-center hover:text-primaryHover">
            <CgWorkAlt className="text-xl" />
            <span className="text-white text-base font-semibold hover:text-primaryHover">
              2
            </span>
          </a>
        </Link>
        <Link href="/artist/contact-info">
          <a className="text-2xl p-3 flex flex-col hover:text-primaryHover items-center">
            <BiPhoneCall className="text-xl" />
            <span className="text-white text-base font-semibold hover:text-primaryHover">
              3
            </span>
          </a>
        </Link>
        <Link href="/artist/pictures-info">
          <a className="text-2xl p-3 flex flex-col  items-center hover:text-primaryHover">
            <HiCamera className="text-xl" />
            <span className="text-white text-base font-semibold hover:text-primaryHover">
              4
            </span>
          </a>
        </Link>
        <Link href="/">
          <a className="text-2xl p-3 flex flex-col  items-center ">
            <AiOutlineUser className="relative top-1 text-3xl text-primary" />
            <span className="text-white text-base font-semibold "></span>
          </a>
        </Link>
      </nav>
    </div>
  )
}

export default SideMenuArtist
