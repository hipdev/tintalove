import SideMenuArtistSteps from 'components/artist-account/side-menu-artist-steps'
import Image from 'next/image'
import Link from 'next/link'
import StepNav from './step-nav'
import { RiArrowGoBackFill } from 'react-icons/ri'
import HeadContainer from 'components/layout/head'
import { UserState } from 'types/user'
import SideMenuArtist from 'components/artist-account/side-menu-artist'
import { AiOutlineCalendar, AiOutlineCamera } from 'react-icons/ai'
import { FiCalendar } from 'react-icons/fi'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { VscMenu } from 'react-icons/vsc'

type Props = {
  uid?: string
  children
  userState?: UserState
}

const LayoutStepsArtist = ({ children, uid, userState }: Props) => {
  // if (!userState) return <span>Loading</span>
  return (
    <div className="flex flex-wrap-reverse lg:flex-nowrap h-auto lg:h-screen">
      <HeadContainer />

      <div className="w-full lg:w-448 bg-dark-800 pl-10 2xl:pl-12 pt-8">
        <div className="w-52 relative h-11 mb-20 hidden lg:block">
          <Link href="/">
            <a>
              <Image
                // layout="fill"
                width={252}
                height={49}
                src="/short-logo.png"
                alt="Picture of the author"
              />
            </a>
          </Link>
        </div>
        {userState && userState?.artist_active && (
          <SideMenuArtist username={userState?.username || null} />
        )}

        {!userState ||
          (userState && !userState?.artist_active && (
            <SideMenuArtistSteps uid={uid} />
          ))}
      </div>
      <div className="w-full pl-7 sm:pl-14 2xl:pl-20 bg-dark-500 text-white">
        <header className="flex justify-between pt-6 pr-0  sm:pr-10 ">
          <div className="flex items-center w-full justify-between">
            <Link href="/">
              <a className=" block lg:hidden mr-5 ">
                {/* <img className="w-52" src="/short-logo.png" /> */}
                <div className="w-40 relative h-9 mt-2  ">
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
            <div className="flex items-center">
              <span className="text-white text-3xl block md:hidden pr-5">
                <VscMenu />
              </span>
              <Link href="/">
                <a className="flex items-center text-2xl md:text-lg">
                  <RiArrowGoBackFill className="mr-5" />
                  <span className="hidden md:block mr-3">Volver al inicio</span>
                </a>
              </Link>
            </div>
          </div>
          <div className="flex">
            {userState?.artist_active && (
              <div className="text-white mr-7 items-center hidden md:flex">
                <Link href="/post/new-post">
                  <a className="text-white font-semibold tracking-wide text-sm bg-primary py-3 hover:bg-primaryHover px-4 xl:px-7 rounded-md flex items-center justify-center">
                    <span className="pr-0 xl:pr-4 text-2xl block xl:hidden">
                      <AiOutlineCamera />
                    </span>
                    <span className="hidden xl:block">PUBLICAR</span>
                  </a>
                </Link>
                <div className="flex items-center gap-2 bg-ocean_blue-300 px-2 py-3 xl:py-1 rounded-md ml-2">
                  <span className="text-green-500 text-2xl">
                    <FiCalendar />
                  </span>
                  <div className="leading-tight hidden xl:block">
                    <p className="text-white">Disponibilidad</p>
                    <p className="text-light-200">En 15 días</p>
                  </div>
                  <span className="text-white text-2xl">
                    <MdKeyboardArrowDown />
                  </span>
                </div>
              </div>
            )}
            <StepNav />
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  )
}

export default LayoutStepsArtist
