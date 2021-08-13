import SideMenuArtistSteps from '../../components/layout-steps/SideMenuArtistSteps'
import Image from 'next/image'
import Link from 'next/link'
import StepNav from './StepNav'
import { RiArrowGoBackFill } from 'react-icons/ri'
import HeadContainer from '../layout/HeadContainer'
import { UserState } from 'types/user'
import SideMenuArtist from '../../components/layout-steps/SideMenuArtist'
import { AiOutlineCamera } from 'react-icons/ai'
import { VscMenu } from 'react-icons/vsc'
import WrapperAvailability from '../layout/Header/WrapperAvailability'
import { Toaster } from 'react-hot-toast'

type Props = {
  uid?: string
  children
  user?: UserState
}

const LayoutStepsArtist = ({ children, uid, user }: Props) => {
  // if (!userState) return <span>Loading</span>
  return (
    <div className="flex flex-wrap-reverse lg:flex-nowrap  h-auto min-h-screen  overflow-auto overflow-x-auto">
      <Toaster
        toastOptions={{
          className: 'bg-red-600',
          style: {
            background: '#158e72',
            border: 'none',
            borderRadius: '3px',
            color: '#fff',
          },
          duration: 3000,
        }}
        position="bottom-right"
      />
      <HeadContainer />
      <div className="w-full lg:w-448  sm:h-auto bg-dark-800 pl-7 sm:pl-10 pt-10 2xl:pl-12 sm:pt-8">
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
        {user && user?.artist_active && (
          <SideMenuArtist username={user?.username || null} />
        )}

        {!user ||
          (user && !user?.artist_active && <SideMenuArtistSteps uid={uid} />)}
      </div>
      <div className="w-full pl-7 sm:pl-7 2xl:pl-20 bg-dark-500">
        <header className="block sm:flex justify-between pt-6 pr-1 sm:pr-10 w-full ">
          <div className="flex items-center justify-between w-full">
            <Link href="/">
              <a className="block lg:hidden mr-5">
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
            <div className="flex items-center">
              <span className="text-white text-3xl block md:hidden pr-5">
                <VscMenu />
              </span>
              <Link href="/">
                <a className="flex items-center text-2xl md:text-lg text-gray-200">
                  <RiArrowGoBackFill className="mr-5" />
                  <span className="hidden md:block mr-3">Volver al inicio</span>
                </a>
              </Link>
            </div>
          </div>
          <div className="flex w-full justify-end">
            {user?.artist_active && (
              <div className="mr-7 items-center hidden md:flex">
                <WrapperAvailability user={user} />
                <Link href="/post/new-post">
                  <a className="text-white font-semibold tracking-wide text-sm bg-primary py-3 hover:bg-primaryHover px-4 xl:px-7 rounded-md flex items-center justify-center ml-3">
                    <span className="pr-0 xl:pr-4 text-2xl block xl:hidden">
                      <AiOutlineCamera />
                    </span>
                    <span className="hidden xl:block">PUBLICAR</span>
                  </a>
                </Link>
              </div>
            )}
            <StepNav />
          </div>
        </header>
        <main className="mb-10">{children}</main>
      </div>
    </div>
  )
}

export default LayoutStepsArtist
