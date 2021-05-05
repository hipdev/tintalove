import Image from 'next/image'
import { TiLocationOutline } from 'react-icons/ti'
import Link from 'next/link'

import { useStateMachine } from 'little-state-machine'
import { getUser } from 'lib/actions'
import SubMenuHeader from './submenu'
import { UserState } from 'types/user'
import { AiOutlineCalendar, AiOutlineCamera } from 'react-icons/ai'

const Header = () => {
  const { state }: any = useStateMachine({
    getUser,
  })

  const { user }: { user: UserState } = state

  console.log(user, 'user info')

  return (
    <nav className="flex flex-col lg:flex-row px-2 sm:px-20 py-4 bg-dark-800">
      <div className="w-full flex flex-wrap justify-center lg:justify-between items-center">
        <div className="flex justify-center items-center">
          <Link href="/">
            <a className="mr-12 w-60">
              {/* <img className="w-52" src="/short-logo.png" /> */}
              <div className="w-52 relative h-11">
                <Image
                  // layout="fill"
                  width={180}
                  height={35}
                  src="/short-logo.png"
                  alt="Picture of the author"
                />
              </div>
            </a>
          </Link>

          <div className="w-full  flex flex-wrap justify-evenly ml-10 sm:ml-0 2xl:ml-24 font-light uppercase">
            <Link href="/">
              <a className="text-white mr-5">TATUAJES</a>
            </Link>
            <Link href="/">
              <a className="text-white mr-5">ARTISTAS</a>
            </Link>
            <Link href="/studio-account/general">
              <a className="text-white mr-5">ESTUDIOS</a>
            </Link>
            {user && !user?.artist_active && (
              <Link href="/artist/main-info">
                <a className="text-white mr-5">
                  {user.displayName.split(' ')[0]}, ERES ARTISTA?
                </a>
              </Link>
            )}
            {!user && (
              <Link href="/">
                <a className="text-white">SOY UN ARTISTA</a>
              </Link>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center">
          <div className="flex flex-wrap justify-evenly py-4 md:py-0 mr-0 md:mr-7">
            <div className="flex items-center space-x-2">
              <span className="text-3xl text-primary">
                <TiLocationOutline />
              </span>
              <select
                name=""
                id=""
                className="bg-transparent text-white font-light font-raleway underline focus:outline-none mr-3"
              >
                <option value="">TODO COLOMBIA</option>
              </select>
            </div>
          </div>

          {user?.artist_active && (
            <div className="text-white mr-7 flex items-center">
              <Link href="/post/create">
                <a className="bg-primary hover:bg-primaryHover px-2 py-1 flex items-center rounded-sm text-sm">
                  Subir post <AiOutlineCamera className="ml-2 text-lg" />
                </a>
              </Link>
              <div>
                <AiOutlineCalendar className="text-xl ml-4" />
              </div>
            </div>
          )}

          <SubMenuHeader user={user} />
        </div>
      </div>
    </nav>
  )
}

export default Header
