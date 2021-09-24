import SideMenuArtistSteps from 'components/layout-steps/SideMenuArtistSteps'
import Image from 'next/image'
import Link from 'next/link'
import { RiArrowGoBackFill } from 'react-icons/ri'
import HeadContainer from 'components/layout/head'
import { UserState } from 'types/user'
import SideMenuArtist from 'components/layout-steps/SideMenuArtist'
import { AiOutlineCamera } from 'react-icons/ai'
import { VscMenu } from 'react-icons/vsc'
import { Toaster } from 'react-hot-toast'
import SubMenuHeader from 'components/layout/header/SubmenuHeader'
import useSWR from 'swr'
import { getArtistInfo } from 'lib/queries/artists'
import Availability from 'components/layout/header/availability'
import { getStudioIsActive } from 'lib/queries/studios'
import { ArtistTypes } from 'types/artist'

type Props = {
  uid?: string
  children
  user?: UserState
}

const LayoutStepsArtist = ({ children, uid, user }: Props) => {
  // if (!userState) return <span>Loading</span>

  const { data: artist }: any = useSWR(
    uid ? ['getArtistInfo', uid] : null,
    getArtistInfo
  )

  const { data: studio } = useSWR(
    user?.id ? ['getStudioIsActive', uid] : null,
    getStudioIsActive
  )

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
                alt="Tinta Love logo"
              />
            </a>
          </Link>
        </div>
        {artist && artist?.is_active && (
          <SideMenuArtist username={user?.username || null} />
        )}

        {!user ||
          (user && !artist?.is_active && <SideMenuArtistSteps uid={uid} />)}
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
          <div className="flex-grow justify-center xl:justify-end gap-5 py-4 md:py-0 ml-0 xl:ml-3 hidden sm:flex">
            {user && artist?.is_active && (
              <>
                <Availability
                  user={user}
                  availability_id={artist?.availability_id}
                  artist={artist}
                />
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
            <div className="gap-3 ml-2 hidden sm:flex items-center flex-shrink-0">
              <SubMenuHeader
                user={user || null}
                artist={artist}
                studio={studio}
              />
            </div>
          </div>
        </header>
        <main className="mb-10">{children}</main>
      </div>
    </div>
  )
}

export default LayoutStepsArtist
