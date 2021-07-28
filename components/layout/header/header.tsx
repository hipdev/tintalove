import Link from 'next/link'
import Image from 'next/image'
import SubMenuHeader from './submenu'
import { UserState } from 'types/user'
import { FiPlus } from 'react-icons/fi'
import { AiOutlineCamera, AiOutlineSearch } from 'react-icons/ai'
import { useStateMachine } from 'little-state-machine'
import { lists } from 'lib/actions'
import WrapperSelectCity from './WrapperSelectCity'
import WrapperAvailability from './WrapperAvailability'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { FaRegHeart } from 'react-icons/fa'

const Header = ({ user, fixed }: { user: UserState; fixed: boolean }) => {
  const {
    state: { list },
    actions,
  }: any = useStateMachine({
    lists,
  })

  return (
    <nav
      className={
        'h-16 md:h-auto xl:h-20 w-full bg-dark-800 py-4 md:py-3 px-5 sm:px-10 lg:px-20 z-20' +
        (fixed ? ' md:fixed' : ' static')
      }
    >
      <div className="relative flex flex-wrap md:flex-nowrap items-center justify-center lg:justify-between">
        <div className="w-full flex flex-shrink items-center justify-between md:justify-center xl:justify-start">
          {!user?.is_artist && (
            <>
              <div className="w-full flex justify-between sm:justify-start items-center">
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
                  <span className="relative top-0 text-white text-2xl block md:hidden px-6">
                    <AiOutlineSearch />
                  </span>
                  <span className="text-white text-3xl block md:hidden">
                    <HiOutlineMenuAlt2 />
                  </span>
                </div>

                {/* Menu desktop */}
                <div className="text-gr-200 hidden md:flex pl-10 xl:pl-14 space-x-2 items-center">
                  <span className="text-3xl">
                    <HiOutlineMenuAlt2 />
                  </span>
                  <Link href="#">
                    <a className="hidden lg:block">Menú</a>
                  </Link>
                </div>
                <div className="text-gr-200 hidden md:flex px-10 lg:px-5 xl:px-10 space-x-2 items-center">
                  <span className="text-2xl flex justify-center">
                    <AiOutlineSearch />
                  </span>
                  <Link href="#">
                    <a className="hidden lg:block">Buscar</a>
                  </Link>
                </div>
                <div className="hidden md:flex items-center space-x-2">
                  <WrapperSelectCity user={user} />
                </div>
              </div>
              <div className="flex-grow justify-center xl:justify-end gap-5 py-4 md:py-0 ml-0 xl:ml-3 hidden sm:flex">
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
                <button className="text-gr-200 hidden md:flex ml-10 xl:ml-14 space-x-2 items-center">
                  <span className="text-3xl">
                    <HiOutlineMenuAlt2 />
                  </span>
                  <Link href="#">
                    <a className="hidden xl:block">Menú</a>
                  </Link>
                </button>
                <button className="text-gr-200 hidden md:flex mx-10 md:mx-5 xl:mx-8 space-x-2 items-center">
                  <span className="text-2xl flex justify-center">
                    <AiOutlineSearch />
                  </span>
                  <Link href="#">
                    <a className="hidden xl:block">Buscar</a>
                  </Link>
                </button>

                <div className="flex items-center space-x-2 mr-2">
                  <WrapperSelectCity user={user} />
                </div>
                <button
                  className="text-gr-200 space-x-2 items-center hidden md:flex mx-2"
                  onClick={() => actions.lists({ post: null, listOpen: true })}
                >
                  <span className="text-xl">
                    <FaRegHeart />
                  </span>
                  <Link href="#">
                    <a className="hidden xl:block truncate">Favoritos</a>
                  </Link>
                </button>
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
