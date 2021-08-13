import { Menu, Transition } from '@headlessui/react'
import { UserState } from 'types/user'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import Link from 'next/link'
import { AiOutlineInstagram } from 'react-icons/ai'

const SubmenuLeft = ({ user }: { user: UserState }) => {
  return (
    <>
      <div className="relative text-left z-50">
        <Menu>
          {({ open }) => (
            <>
              <Menu.Button className="text-white flex items-center relative transition duration-150 ease-in-out outline-none focus:outline-none">
                {/* <span className="mr-3">{user.displayName}</span> */}
                <span className="text-3xl">
                  <HiOutlineMenuAlt2 />
                </span>

                <span className="hidden lg:block">Menú</span>
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
                  className="absolute left-0 w-56 mt-2 origin-top-left bg-dark-800 border border-gray-600 divide-y divide-gray-100 rounded-sm shadow-lg outline-none"
                >
                  <div className="py-0">
                    {!user?.artist_active && (
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="/artist/main-info">
                            <a
                              className={`${
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-400'
                              } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left hover:bg-gray-900`}
                            >
                              Soy un artista
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                    )}

                    {!user?.has_studio && (
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="/studio-account/general">
                            <a
                              className={`${
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-400'
                              } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left hover:bg-gray-900`}
                            >
                              Para estudios
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                    )}

                    {/* <Menu.Item
                          as="span"
                          disabled
                          className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50"
                        >
                          New feature (soon)
                        </Menu.Item> */}
                  </div>

                  <div className="py-0">
                    <Menu.Item>
                      <div className="pl-3 py-2 text-2xl">
                        <a
                          href="https://instagram.com/tinta.love"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <AiOutlineInstagram />
                        </a>
                      </div>
                    </Menu.Item>
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
  )
}

export default SubmenuLeft
