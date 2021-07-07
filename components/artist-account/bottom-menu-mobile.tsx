import Link from 'next/link'
import { AiOutlineUser } from 'react-icons/ai'
import { BiPhoneCall } from 'react-icons/bi'
import { CgWorkAlt } from 'react-icons/cg'
import { FaRegUserCircle } from 'react-icons/fa'
import { HiCamera } from 'react-icons/hi'

const BottomMenuMobileArtist = () => {
  return (
    <nav className="flex bg-dark-500 z-40  fixed left-0 bottom-0 w-full justify-evenly text-gray-200  sm:hidden">
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
  )
}

export default BottomMenuMobileArtist
