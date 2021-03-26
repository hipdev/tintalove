import Image from 'next/image'
import { TiLocationOutline } from 'react-icons/ti'
import { VscChevronDown } from 'react-icons/vsc'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import { signOut } from 'firebase/auth'
import { auth } from 'lib/firebase'
import { createUser } from 'lib/db'
import { useStateMachine } from 'little-state-machine'
import { getUser, login } from 'lib/actions'
import React from 'react'

const provider = new GoogleAuthProvider()

const Header = () => {
  const { state }: any = useStateMachine({
    getUser,
  })
  const { state: loginState, actions } = useStateMachine({
    login,
  })

  const { user } = state

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        actions.login(null)
      })
      .catch((error) => console.log(error, 'error cerrando sesión'))
  }
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user
        const res = await createUser(user)

        if (res) actions.login(true)
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        console.log(errorCode)
      })
  }

  return (
    <nav className="flex flex-col lg:flex-row px-2 sm:px-20 py-4 bg-gradient-to-r from-dark-700   to-black">
      <div className="w-full flex flex-wrap justify-center lg:justify-between items-center">
        <div className="flex justify-center items-center">
          <Link href="/">
            <a className="mr-12 w-60">
              {/* <img className="w-52" src="/short-logo.png" /> */}
              <div className="w-52 relative h-11">
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

          <div className="w-full  flex flex-wrap justify-evenly ml-10 sm:ml-0 2xl:ml-24 font-light uppercase">
            <Link href="/">
              <a className="text-white mr-5">TATUAJES</a>
            </Link>
            <Link href="/">
              <a className="text-white mr-5">ARTISTAS</a>
            </Link>
            <Link href="/">
              <a className="text-white mr-5">ESTUDIOS</a>
            </Link>
            {user && (
              <Link href="/artist/new/main-info">
                <a className="text-white mr-5">
                  {user.displayName.split(' ')[0]}, ERES ARTISTA?
                </a>
              </Link>
            )}
            {!user && (
              <Link href="/">
                <a className="text-white">SOY UN ARTISTA</a>
              </Link>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center">
          <div className="flex flex-wrap justify-evenly py-4 md:py-0 mr-0 md:mr-7">
            <div className="flex items-center space-x-2">
              <span className="text-3xl text-red-600">
                <TiLocationOutline />
              </span>
              <select
                name=""
                id=""
                className="bg-transparent text-white font-light font-raleway underline focus:outline-none mr-3"
              >
                <option value="">TODO COLOMBIA</option>
              </select>
            </div>
          </div>
          {!user && (
            <>
              <button
                onClick={handleLogin}
                className="btn-red w-auto text-white px-5 py-3 mx-auto sm:mx-0 rounded-lg focus:outline-none"
              >
                Acceder
              </button>
            </>
          )}
          {user && (
            <>
              <div className="relative text-left z-10">
                <Menu>
                  {({ open }) => (
                    <>
                      <Menu.Button className="text-white flex items-center relative transition duration-150 ease-in-out outline-none focus:outline-none">
                        <VscChevronDown className="text-2xl mr-1" />
                        <span>{user.displayName}</span>
                        <img
                          className="w-12 rounded-full ml-3"
                          src={user.photo}
                        />
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
                              {user.email}
                            </p>
                          </div>

                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#account-settings"
                                  className={`${
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700'
                                  } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                >
                                  Mi cuenta
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#support"
                                  className={`${
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700'
                                  } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                >
                                  Ayuda
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item
                              as="span"
                              disabled
                              className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50"
                            >
                              New feature (soon)
                            </Menu.Item>
                          </div>

                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={handleLogout}
                                  className={`${
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700'
                                  } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                >
                                  Salir
                                </button>
                              )}
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
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header
