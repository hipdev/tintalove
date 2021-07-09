import Link from 'next/link'
import Image from 'next/image'
import { VscMenu } from 'react-icons/vsc'
import SubMenuHeader from './submenu'
import { AiOutlineSearch } from 'react-icons/ai'
import { UserState } from 'types/user'
import { GoSearch } from 'react-icons/go'
import { FiHeart } from 'react-icons/fi'
import { AiOutlineCamera } from 'react-icons/ai'
import { useStateMachine } from 'little-state-machine'
import { lists } from 'lib/actions'
import SelectCity from './SelectCity'
import WrapperSelectCity from './WrapperSelectCity'
import WrapperAvailability from './WrapperAvailability'

const Header = ({ user }: { user: UserState }) => {
  const {
    state: { list },
    actions,
  }: any = useStateMachine({
    lists,
  })
  return (
    <nav className="h-16 md:h-auto xl:h-20 w-full bg-dark-800 py-4 md:py-3 px-5 sm:px-10 lg:px-20 fixed z-20">
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
                    <VscMenu onClick={() => window.navigator.vibrate(500)} />
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
                <span className="text-white text-3xl hidden md:block px-10">
                  <VscMenu />
                </span>
                <div className="lg:w-full xl:w-9/12 relative hidden lg:flex items-center">
                  <input
                    type="search"
                    placeholder="ENCUENTRA TATUAJES Y ARTISTAS INCREIBLES"
                    className="w-96 lg:w-full xl:w-2/3 h-12 px-5 rounded-l-lg placeholder-white truncate bg-ocean_blue-300 text-white
                    "
                  />
                  <button
                    type="submit"
                    className="w-14 h-12 bg-green-500 rounded-r-lg"
                  >
                    <span className="text-xl text-white flex justify-center">
                      <GoSearch />
                    </span>
                  </button>
                  {/* JULI Este es el botón que abre las listas pero no nos aparece cuando es un usuario normal, en cambio sale en el geader de artista pls help us 
                  <button
                    className="text-white w-14 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 ml-5 hover:bg-primaryHover focus:outline-none"
                    onClick={() =>
                      actions.lists({ post: null, listOpen: true })
                    }
                  >
                    <span className="text-xl ">
                      <FiHeart />
                    </span>
                  </button>
                  */}
                </div>
                <div className="flex items-center space-x-2 ml-0 lg:ml-2">
                  <WrapperSelectCity user={user} />
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
              <div className="gap-3 ml-2 hidden md:flex items-center flex-shrink-0">
                {user?.artist_active && (
                  <>
                    <WrapperAvailability user={user} />
                    <Link href="/post/new-post">
                      <a className="text-white font-semibold tracking-wide text-sm bg-primary py-3 hover:bg-primaryHover px-4 xl:px-7 rounded-md flex items-center justify-center">
                        <span className="pr-0 xl:pr-4 text-2xl block xl:hidden">
                          <AiOutlineCamera />
                        </span>
                        <span className="hidden xl:block">PUBLICAR</span>
                      </a>
                    </Link>
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
