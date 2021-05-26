import Link from 'next/link'
import Image from 'next/image'
import { VscMenu } from 'react-icons/vsc'
import { TiLocationOutline } from 'react-icons/ti'
import SubMenuHeader from './submenu'
import { useStateMachine } from 'little-state-machine'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { FiCalendar } from 'react-icons/fi'
import { GoSearch } from 'react-icons/go'
import { AiOutlineCamera } from 'react-icons/ai'
import { UserState } from 'types/user'

const Header = ({ user }: { user: UserState }) => {
  return (
    <nav className="h-16 md:h-auto xl:h-20 w-full bg-dark-800 py-6 md:py-4 px-5 sm:px-10 lg:px-20">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-center lg:justify-between">
        <div className="w-full flex flex-shrink items-center justify-between md:justify-center xl:justify-start">
          {!user?.is_artist && (
            <>
              <div className="w-full flex justify-between lg:justify-start items-center">
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
                {/*New elements for tablet resolution*/}
                <div className="flex items-center">
                  <span className="relative top-0 text-white text-2xl block lg:hidden px-6">
                    <GoSearch />
                  </span>
                  <span className="text-white text-3xl block lg:hidden">
                    <VscMenu />
                  </span>
                </div>
                <span className="text-white text-3xl hidden lg:block px-10">
                  <VscMenu />
                </span>
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
                      <GoSearch />
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex-grow justify-center xl:justify-end gap-5 py-4 md:py-0 ml-0 xl:ml-3 hidden lg:flex">
                <div className="flex items-center space-x-2 md:ml-6 lg:ml-2">
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
                <SubMenuHeader user={user} />
              </div>
            </>
          )}
          {user?.is_artist && (
            <div className="flex  items-center justify-between w-full">
              <div className="flex items-center">
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
                <span className="text-white text-2xl hidden md:block px-10">
                  <VscMenu />
                </span>
                <div className="w-10 xl:w-28 items-center gap-3 hidden md:flex">
                  <span className="text-white text-2xl">
                    <GoSearch />
                  </span>
                  <input
                    type="text"
                    placeholder="BUSCAR"
                    className="placeholder-white text-white bg-transparent w-0 xl:w-28 truncate hidden xl:block"
                  />
                </div>
                <div className="items-center space-x-2 ml- md:ml-6 lg:ml-0 hidden md:flex">
                  <span className="text-3xl text-white">
                    <TiLocationOutline />
                  </span>
                  <select
                    name=""
                    id=""
                    className="bg-transparent text-white font-light font-raleway focus:outline-none hidden xl:block"
                  >
                    <option value="">TODO COLOMBIA</option>
                  </select>
                </div>
              </div>
              {/*New elements for tablet resolution*/}
              <div className="flex items-center">
                <span className="text-white text-2xl block md:hidden px-0 md:px-10 pr-10 md:pr-0">
                  <GoSearch />
                </span>
                <span className="text-white text-3xl block md:hidden">
                  <VscMenu />
                </span>
              </div>
              <div className="gap-3 ml-2 hidden md:flex">
                <div className="ml-10">
                  <div className="flex items-center gap-2 bg-ocean_blue-300 px-2 py-3 xl:py-1 rounded-md">
                    <span className="text-green-500 text-2xl">
                      <FiCalendar />
                    </span>
                    <div className="leading-tight hidden xl:block">
                      <p className="text-white">Disponibilidad</p>
                      <p className="text-light-200">En 2 meses</p>
                    </div>
                    <span className="text-white text-2xl">
                      <MdKeyboardArrowDown />
                    </span>
                  </div>
                </div>

                {user?.artist_active && (
                  <Link href="/post/new-post">
                    <a className="text-white font-semibold tracking-wide text-sm bg-primary hover:bg-primaryHover px-4 xl:px-7 rounded-md flex items-center justify-center">
                      <span className="pr-0 xl:pr-4 text-2xl block xl:hidden">
                        <AiOutlineCamera />
                      </span>
                      <span className="hidden xl:block">PUBLICAR</span>
                    </a>
                  </Link>
                )}

                <SubMenuHeader user={user || null} />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header
