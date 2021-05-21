import Link from 'next/link'
import Image from 'next/image'
import { VscMenu } from 'react-icons/vsc'
import { BsSearch } from 'react-icons/bs'
import { TiLocationOutline } from 'react-icons/ti'
import SubMenuHeader from './submenu'
import { useStateMachine } from 'little-state-machine'
import { getUser } from 'lib/actions'
import { UserState } from 'types/user'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { FiCalendar } from 'react-icons/fi'
import useUser from 'hooks/use-user'

const Header = () => {
  const { state } = useUser()

  const { user } = state
  return (
    <nav className="h-auto xl:h-20 w-full bg-dark-800 py-4 px-10 md:px-20">
      <div className="flex flex-wrap md:flex-nowrap justify-center xl:justify-between">
        <div className="w-full flex flex-shrink items-center justify-between md:justify-center xl:justify-start">
          <Link href="/">
            <a>
              {/* <img className="w-52" src="/short-logo.png" /> */}
              <div className="w-40 relative h-9 mt-2">
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
          <span className="text-white text-2xl hidden md:block">
            <VscMenu />
          </span>
          {!user?.is_artist && (
            <>
              <div className="lg:w-full xl:w-7/12 relative hidden lg:flex items-center">
                <input
                  type="search"
                  placeholder="ENCUENTRA TATUAJES Y ARTISTAS INCREIBLES"
                  className="w-96 lg:w-full xl:w-7/12 h-12 px-5 rounded-l-lg placeholder-black truncate"
                />
                <button
                  type="submit"
                  className="w-14 h-12 bg-green-500 rounded-r-lg"
                >
                  <span className="text-xl text-white flex justify-center">
                    <BsSearch />
                  </span>
                </button>
              </div>
              <div className="flex-grow justify-center xl:justify-end gap-5 py-4 md:py-0 ml-0 xl:ml-3 hidden md:flex mr-5">
                <div className="flex items-center space-x-2 ml- md:ml-6 lg:ml-0">
                  <span className="text-3xl text-primary">
                    <TiLocationOutline />
                  </span>
                  <select
                    name=""
                    id=""
                    className="bg-transparent text-white font-light font-raleway underline focus:outline-none"
                  >
                    <option value="">TODO COLOMBIA</option>
                  </select>
                </div>
              </div>
              <SubMenuHeader user={user} />
            </>
          )}
          {user?.is_artist && (
            <div className="flex flex-wrap xl:flex-nowrap justify-between w-full">
              <div className="flex ">
                <div className="w-28 flex items-center gap-3">
                  <span className="text-white text-xl">
                    <BsSearch />
                  </span>
                  <input
                    type="text"
                    placeholder="BUSCAR"
                    className="placeholder-white text-white bg-transparent w-28 truncate "
                  />
                </div>
                <div className="flex items-center space-x-2 ml- md:ml-6 lg:ml-0">
                  <span className="text-3xl text-white">
                    <TiLocationOutline />
                  </span>
                  <select
                    name=""
                    id=""
                    className="bg-transparent text-white font-light font-raleway focus:outline-none"
                  >
                    <option value="">TODO COLOMBIA</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 ml-2 ">
                <div>
                  <div className="flex items-center gap-2 bg-ocean_blue-300 px-2 py-1 rounded-md">
                    <span className="text-green-500 text-2xl">
                      <FiCalendar />
                    </span>
                    <div className="leading-tight">
                      <p className="text-white">Disponibilidad</p>
                      <p className="text-light-200">En 2 meses</p>
                    </div>
                    <span className="text-white text-2xl">
                      <MdKeyboardArrowDown />
                    </span>
                  </div>
                </div>
                <button className="text-white font-semibold tracking-wide text-sm bg-green-600 px-7 rounded-md">
                  PUBLICAR
                </button>
                <SubMenuHeader user={user} />
              </div>
            </div>
          )}
          <div className="flex items-center gap-8">
            <span className="static text-xl text-white block lg:hidden">
              <BsSearch />
            </span>
            <span className="static text-white text-3xl block md:hidden">
              <VscMenu />
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
