import Image from 'next/image'
import Link from 'next/link'
import { RiArrowGoBackFill } from 'react-icons/ri'
import HeadContainer from 'components/layout/head'
import { UserState } from 'types/user'
import { AiOutlineCamera } from 'react-icons/ai'
import SideMenuStudioSteps from 'components/layout-steps/SideMenuStudioSteps'
import SideMenuStudio from 'components/layout-steps/SideMenuStudio'
import { VscMenu } from 'react-icons/vsc'
import SubMenuHeader from 'components/layout/header/SubmenuHeader'
import useSWR from 'swr'
import { getStudioData } from 'lib/queries/studios'
import { Toaster } from 'react-hot-toast'
import Availability from 'components/layout/header/availability'
import { getArtistInfo } from 'lib/queries/artists'

type Props = {
  uid?: string
  children
  user?: UserState
}

const LayoutStepsStudio = ({ children, uid, user }: Props) => {
  // if (!userState) return <span>Loading</span>

  const { data: dataStudio } = useSWR(
    user?.id ? ['getStudioData', uid] : null,
    getStudioData
  )

  const { data: artist } = useSWR(
    uid ? ['getArtistInfo', uid] : null,
    getArtistInfo
  )

  console.log(dataStudio, 'studio')

  return (
    <div className="flex flex-wrap-reverse lg:flex-nowrap  h-auto min-h-screen  overflow-auto overflow-x-auto">
      <Toaster
        toastOptions={{
          className: 'bg-red-600 mb-20 mr-3',
          style: {
            background: '#158e72',
            border: 'none',
            borderRadius: '3px',
            color: '#fff',
          },
          duration: 3000,
        }}
        containerStyle={{
          top: '5rem',
          right: '1rem',
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
        {dataStudio?.studios?.is_active ? (
          <SideMenuStudio username={dataStudio?.username || null} />
        ) : (
          <SideMenuStudioSteps studioId={dataStudio?.id} />
        )}
      </div>

      <div className="w-full pl-7 sm:pl-7 2xl:pl-20 bg-dark-500 ">
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
                <a className="flex items-center text-2xl md:text-lg text-white">
                  <RiArrowGoBackFill className="mr-5" />
                  <span className="hidden md:block mr-3">Volver al inicio</span>
                </a>
              </Link>
            </div>
          </div>
          <div className="flex-grow justify-center xl:justify-end gap-5 py-4 md:py-0 ml-0 xl:ml-3 hidden sm:flex ">
            {user && artist?.is_active && (
              <>
                <Availability
                  user={user}
                  availability_id={artist?.availability_id}
                  artist={artist}
                />
                <Link href="/post/new-post">
                  <a className="text-white font-semibold tracking-wide text-sm bg-primary py-3 hover:bg-primaryHover px-4 xl:px-7 rounded-md flex items-center justify-center ml-3">
                    <span className="pr-0 xl:pr-4 text-2xl block xl:hidden">
                      <AiOutlineCamera />
                    </span>
                    <span className="hidden xl:block">PUBLICAR</span>
                  </a>
                </Link>
              </>
            )}
            <div className="gap-3 ml-2 hidden sm:flex items-center flex-shrink-0">
              <SubMenuHeader user={user || null} />
            </div>
          </div>
        </header>
        <main className="mb-10">{children}</main>
      </div>
    </div>
  )
}

export default LayoutStepsStudio
