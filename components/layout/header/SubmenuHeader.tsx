import { VscChevronDown } from 'react-icons/vsc'
import { Menu, Transition } from '@headlessui/react'
import { UserState } from 'types/user'
import { useContext } from 'react'
import { LoginContext } from 'pages/_app'
import Link from 'next/link'
import { useUser } from 'hooks/useUser'
import { ArtistTypes } from 'types/artist'
import { StudioTypes } from 'types/studio'

const SubMenuHeader = ({
  user,
  artist,
  studio,
}: {
  user: UserState
  artist?: ArtistTypes
  studio?: StudioTypes
}) => {
  const { openModal } = useContext(LoginContext)
  const { signOut } = useUser()

  const handleLogout = () => {
    signOut()
  }

  console.log(artist, 'el artista en header')

  return (
    <>
      {!user && (
        <>
          {/* {isOpen && (
            <LoginModal
              modal={{ isOpen, setIsOpen }}
              handleLogin={handleLogin}
            />
          )} */}

          <button
            title="Acceder con Gmail"
            // onClick={handleLogin}
            onClick={openModal}
            className="btn-primary w-auto text-white px-5 py-3 mx-auto sm:mx-0 rounded-lg focus:outline-none"
          >
            Acceder
          </button>
        </>
      )}
      {user && (
        <>
          <div className="relative text-left z-50">
            <Menu>
              {({ open }) => (
                <>
                  <Menu.Button className="text-white flex items-center relative transition duration-150 ease-in-out outline-none focus:outline-none">
                    {/* <span className="mr-3">{user.displayName}</span> */}
                    <img
                      className="w-12 h-12 rounded-full object-cover"
                      src={
                        artist?.artists_main_photos
                          ? artist?.artists_main_photos?.url +
                            '/tr:pr-true,c-at_max,f-auto,w-100,q-50'
                          : user?.photo_url || '/unuser.png'
                      }
                      alt="user image"
                    />
                    <VscChevronDown className="text-2xl ml-3 " />
                  </Menu.Button>

                  <Transition
                    show={open}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      static
                      className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                    >
                      <div className="px-4 py-3">
                        <p className="text-sm leading-5">Hola!</p>
                        <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                          {user.full_name || user.email || 'Sin nombre'}
                        </p>
                      </div>

                      <div className="py-1">
                        <Link
                          href={artist ? '/artist/main-info' : '/user/profile'}
                        >
                          <a className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left hover:bg-gray-100">
                            Mi cuenta
                          </a>
                        </Link>

                        {studio && (
                          <Link href="/studio-account/general">
                            <a className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left hover:bg-gray-100">
                              Administrar estudio
                            </a>
                          </Link>
                        )}

                        <a
                          href="#support"
                          className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                        >
                          Ayuda
                        </a>

                        {/* <Menu.Item
                          as="span"
                          disabled
                          className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50"
                        >
                          New feature (soon)
                        </Menu.Item> */}
                      </div>

                      <div className="py-1">
                        <button
                          onClick={handleLogout}
                          className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left hover:bg-gray-100"
                        >
                          Salir
                        </button>
                      </div>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
          {/* <button
          className="w-1/2 sm:w-auto text-white px-6 py-3 mx-auto sm:mx-0 rounded-lg focus:outline-none"
          onClick={handleLogout}
        >
          Salir
        </button> */}
        </>
      )}
    </>
  )
}

export default SubMenuHeader
