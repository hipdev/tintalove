import SideMenuArtistSteps from 'components/artist-account/side-menu-artist-steps'
import Image from 'next/image'
import Link from 'next/link'
import StepNav from './step-nav'
import { RiArrowGoBackFill } from 'react-icons/ri'
import HeadContainer from 'components/layout/head'
import { UserState } from 'types/user'
import SideMenuArtist from 'components/artist-account/side-menu-artist'
import { AiOutlineCalendar, AiOutlineCamera } from 'react-icons/ai'

type Props = {
  uid?: string
  children
  userState?: UserState
}

const LayoutStepsStudio = ({ children, uid, userState }: Props) => {
  console.log(userState, 'estado de usuario')
  // if (!userState) return <span>Loading</span>
  return (
    <div className="grid grid-cols-10 h-screen">
      <HeadContainer />

      <div className="col-span-3 2xl:col-span-2 bg-dark-800 pl-10 2xl:pl-12 pt-8 row-span-full">
        <div className="w-52 relative h-11 mb-20">
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
      <div className="col-span-7 2xl:col-span-8 pl-14 2xl:pl-20 bg-dark-500 text-white">
        <header className="flex justify-between pt-6  pr-10">
          <Link href="/">
            <a className="flex items-center">
              <RiArrowGoBackFill className="mr-5" /> Volver al inicio
            </a>
          </Link>
          <div className="flex">
            {userState?.artist_active && (
              <div className="text-white mr-7 flex items-center">
                <Link href="#">
                  <a className="bg-primary px-2 py-1 flex items-center rounded-sm text-sm">
                    Subir post <AiOutlineCamera className="ml-2 text-lg" />
                  </a>
                </Link>
                <div>
                  <AiOutlineCalendar className="text-xl ml-4" />
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

export default LayoutStepsStudio
