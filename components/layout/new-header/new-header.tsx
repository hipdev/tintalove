import Link from 'next/link'
import Image from 'next/image'
import { VscMenu } from 'react-icons/vsc'
import { BsSearch } from 'react-icons/bs'
import { TiLocationOutline } from 'react-icons/ti'
import { AiOutlineCalendar, AiOutlineCamera } from 'react-icons/ai'
import SubMenuHeader from './submenu-header'
import { useStateMachine } from 'little-state-machine'
import { getUser } from 'lib/actions'
import { UserState } from 'types/user'

const NewHeader = () => {
  const { state }: any = useStateMachine({
    getUser,
  })

  const { user }: { user: UserState } = state

  console.log(user, 'user info')

  return (
    <nav className="h-auto xl:h-20 w-full bg-blue-500 py-4 px-20">
      <div className="flex flex-wrap xl:flex-nowrap justify-center  xl:justify-between">
        <div className="flex flex-shrink items-center xl:justify-start gap-10 mb:0 sm:mb-4 xl:mb-0 w-full justify-center">
          <Link href="/">
            <a>
              {/* <img className="w-52" src="/short-logo.png" /> */}
              <div className="w-40 relative  h-9 mt-2">
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
          <span className="text-white text-2xl hidden md:block">
            <VscMenu />
          </span>
          <div className="hidden md:flex items-center relative">
            <input
              type="search"
              placeholder="ENCUENTRA TATUAJES Y ARTISTAS INCREIBLES"
              className="w-96 xl:w-510 h-12 px-5 rounded-l-lg placeholder-black truncate"
            />
            <button
              type="submit"
              className="w-14 h-12 bg-green-500 rounded-r-lg"
            >
              <span className="text-xl text-white flex justify-center">
                <BsSearch />
              </span>
            </button>
          </div>
          <span className="static   text-white text-2xl  md:hidden">
            <VscMenu />
          </span>
        </div>
        <div className="flex flex-grow justify-center xl:justify-end gap-5 py-4 md:py-0">
          <div className="flex items-center space-x-2">
            <span className="text-3xl text-primary">
              <TiLocationOutline />
            </span>
            <select
              name=""
              id=""
              className="bg-transparent text-white font-light font-raleway underline focus:outline-none mr-3 hidden md:block"
            >
              <option value="">TODO COLOMBIA</option>
            </select>
          </div>
          <button className="text-white text-base font-semibold tracking-wide bg-green-600 px-8 rounded-lg py-3">
            ACCEDER
          </button>
        </div>
        {/*      {user?.artist_active && (
          <div className="text-white mr-7 flex items-center">
            <Link href="/post/create">
              <a className="bg-primary hover:bg-primaryHover px-2 py-1 flex items-center rounded-sm text-sm">
                Subir post <AiOutlineCamera className="ml-2 text-lg" />
              </a>
            </Link>
            <div>
              <AiOutlineCalendar className="text-xl ml-4" />
            </div>
          </div>
        )}

        <SubMenuHeader user={user} />

*/}
      </div>
    </nav>
  )
}

export default NewHeader
