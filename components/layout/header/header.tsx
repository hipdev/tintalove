import Link from 'next/link'
import Image from 'next/image'
import { VscMenu } from 'react-icons/vsc'
import SubMenuHeader from './submenu'
import { UserState } from 'types/user'
import { GoSearch } from 'react-icons/go'
import { FiHeart, FiPlus } from 'react-icons/fi'
import { AiOutlineCamera, AiOutlineSearch } from 'react-icons/ai'
import { useStateMachine } from 'little-state-machine'
import { lists } from 'lib/actions'
import WrapperSelectCity from './WrapperSelectCity'
import WrapperAvailability from './WrapperAvailability'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'

const Header = ({ user }: { user: UserState }) => {
  const {
    state: { list },
    actions,
  }: any = useStateMachine({
    lists,
  })
  return (
    <nav className="h-16 md:h-auto xl:h-20 w-full bg-dark-800 py-4 md:py-3 px-5 sm:px-10 lg:px-20  static 2xl:fixed z-20">
      <div className="relative flex flex-wrap md:flex-nowrap items-center justify-center lg:justify-between">
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
                        alt="Logo Tinta Love"
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

                {/* Menu desktop */}
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
                    <span className="text-2xl text-white flex justify-center">
                      <GoSearch />
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex-grow justify-center xl:justify-end gap-5 py-4 md:py-0 ml-0 xl:ml-3 hidden lg:flex">
                <div className="flex items-center space-x-2 md:ml-6 lg:ml-2">
                  <WrapperSelectCity user={user} />
                </div>
                <SubMenuHeader user={user} />
              </div>
            </>
          )}
          {user?.is_artist && (
            <div className="flex  items-center justify-between w-full">
              <div className="flex items-center w-7/12 lg:w-2/3 xl:w-4/5">
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
                <div className="text-gr-200 hidden md:flex pl-10 xl:pl-14 space-x-2 items-center">
                  <span className="text-3xl">
                    <HiOutlineMenuAlt2 />
                  </span>
                  <Link href="#">
                    <a className="hidden lg:block">Menú</a>
                  </Link>
                </div>
                <div className="text-gr-200 hidden md:flex px-5 xl:px-10 space-x-2 items-center">
                  <span className="text-2xl flex justify-center">
                    <AiOutlineSearch />
                  </span>
                  <Link href="#">
                    <a className="hidden lg:block">Buscar</a>
                  </Link>
                </div>

                <div className="flex items-center space-x-2">
                  <WrapperSelectCity user={user} />
                </div>
              </div>
              {/*New elements for tablet resolution*/}
              <div className="flex items-center">
                <span className="text-white text-2xl block md:hidden px-0 md:px-10 pr-10 md:pr-0">
                  <AiOutlineSearch />
                </span>
                <span className="text-white text-3xl block md:hidden">
                  <HiOutlineMenuAlt2 />
                </span>
              </div>
              <div className="gap-3 ml-2 hidden md:flex items-center flex-shrink-0">
                {user?.artist_active && (
                  <>
                    <WrapperAvailability user={user} />
                    <div className="flex">
                      <button>
                        <Link href="/post/new-post">
                          <a className="text-white font-semibold tracking-wide text-sm bg-gn-400 py-3 xl:py-4 hover:bg-primaryHover px-4 xl:px-7 rounded-l-lg flex items-center justify-center">
                            <span className="pr-0 xl:pr-4 text-2xl block xl:hidden">
                              <AiOutlineCamera />
                            </span>
                            <span className="hidden xl:block">PUBLICAR</span>
                          </a>
                        </Link>
                      </button>
                      <button>
                        <Link href="/post/new-post">
                          <a className="text-white font-semibold tracking-wide text-sm bg-gn-500 py-3 xl:py-4 hover:bg-primaryHover px-4 xl:px-7 rounded-r-lg flex items-center justify-center">
                            <span className="text-nt-200 text-2xl xl:text-xl">
                              <FiPlus />
                            </span>
                          </a>
                        </Link>
                      </button>
                    </div>
                  </>
                )}

                <div className="gap-3 ml-2 hidden md:flex items-center flex-shrink-0">
                  <SubMenuHeader user={user || null} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header
