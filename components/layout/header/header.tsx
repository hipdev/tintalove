import Link from 'next/link'
import Image from 'next/image'
import SubMenuHeader from './Submenu'
import { UserState } from 'types/user'
import { FiPlus } from 'react-icons/fi'
import { AiOutlineCamera, AiOutlineSearch } from 'react-icons/ai'
import { useStateMachine } from 'little-state-machine'
import { lists } from 'lib/actions'
import WrapperSelectCity from './WrapperSelectCity'
import WrapperAvailability from './WrapperAvailability'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { FaRegHeart } from 'react-icons/fa'
import SubmenuLeft from './SubmenuLeft'

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
        'h-16 md:h-auto w-full bg-dark-800 py-4 md:py-3 px-5 sm:px-10 lg:px-20 z-20' +
        (fixed ? ' md:fixed' : ' static')
      }
    >
      <div className="relative flex flex-wrap md:flex-nowrap items-center justify-center lg:justify-between">
        <div className="w-full flex flex-shrink items-center justify-between md:justify-center xl:justify-start">
          {/* Menu start  */}
          <div className="w-full flex justify-between sm:justify-start items-center">
            <Link href="/">
              <a>
                {/* <img className="w-52" src="/short-logo.png" /> */}
                <div className="w-32 sm:w-40 relative h-9 mt-2">
                  <Image
                    // layout="fill"
                    width={180}
                    height={35}
                    src="/short-logo.png"
                    alt="Logo Tinta Love"
                    loading="eager"
                  />
                </div>
              </a>
            </Link>

            {/* Menu desktop */}
            {(!user?.has_studio || !user?.artist_active) && (
              <div className="text-gr-200 hidden md:flex pl-10 xl:pl-14 space-x-2 items-center">
                <SubmenuLeft user={user} />
              </div>
            )}

            <div className="text-gr-200 hidden md:flex px-10 lg:px-5 xl:px-10 space-x-2 items-center">
              <span className="text-2xl flex justify-center">
                <AiOutlineSearch />
              </span>
              <Link href="#">
                <a className="hidden lg:block">Buscar</a>
              </Link>
            </div>
            <div className="flex md:flex items-center space-x-2">
              <WrapperSelectCity user={user} />
            </div>

            {/*New elements for tablet resolution*/}
            <div className="flex items-center">
              <span className="text-white text-3xl block md:hidden">
                <HiOutlineMenuAlt2 />
              </span>
            </div>
            {user && (
              <button
                className="text-gr-200 space-x-2 items-center hidden md:flex mx-2 ml-2"
                onClick={() => actions.lists({ post: null, listOpen: true })}
              >
                <span className="text-xl ml-2">
                  <FaRegHeart />
                </span>

                <span className="hidden xl:block truncate">Favoritos</span>
              </button>
            )}
          </div>

          <div className="flex-grow justify-center xl:justify-end gap-5 py-4 md:py-0 ml-0 xl:ml-3 hidden sm:flex">
            {user?.artist_active && (
              <>
                <WrapperAvailability user={user} />
                <div className="flex">
                  <button>
                    <Link href="/post/new-post">
                      <a className="text-white tracking-wide text-sm bg-primary py-3 hover:bg-primaryHover px-4 xl:px-7 rounded-lg flex items-center justify-center">
                        <span className="pr-0 xl:pr-4 text-2xl block xl:hidden">
                          <AiOutlineCamera />
                        </span>
                        <span className="hidden xl:block">PUBLICAR</span>
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
      </div>
    </nav>
  )
}

export default Header
