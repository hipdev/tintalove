import { TiLocationOutline } from 'react-icons/ti';
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { signOut } from "firebase/auth";
import { auth } from "lib/firebase";
import { createUser } from "lib/db";
import { useStateMachine } from "little-state-machine";
import { getUser, login } from "lib/actions";

const provider = new GoogleAuthProvider();

const Header = () => {
  const { state }: any = useStateMachine({
    getUser,
  });
  const { state: loginState, actions } = useStateMachine({
    login,
  });

  const { user } = state;
  console.log(user, "el user");

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        actions.login(null);
      })
      .catch((error) => console.log(error, "error cerrando sesión"));
  };
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        actions.login(true);
        const user = result.user;
        createUser(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
      });
  };

  return (
    <nav className="flex flex-col lg:flex-row px-2 sm:px-20 py-4 bg-gradient-to-r from-dark-700   to-black">
      <div className="w-full flex flex-wrap justify-center lg:justify-between items-center">
        <div className="flex flex-wrap justify-center items-center">
          <div className="mb-1">
            <Link href="/">
              <a className="relative flex items-center">
                <img className="w-48 relative top-4" src="/logo2.jpg" />
              </a>
            </Link>
          </div>
          <div className="w-full md:w-96 flex flex-wrap justify-evenly mb-0 md:mb-2 lg:mb-0 py-4 md:py-0">
            <Link href="/">
              <a className="text-white">Tatuajes</a>
            </Link>
            <Link href="/">
              <a className="text-white">Artistas</a>
            </Link>
            <Link href="/">
              <a className="text-white">Soy un artista</a>
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center">
          {!user && (
            <>
              <div className='flex flex-wrap justify-evenly py-4 md:py-0 mr-0 md:mr-7'>
              <div className='flex items-center space-x-2'>
                <span className='text-3xl text-red-600'>
                  <TiLocationOutline />
                </span>
                <select
                  name=''
                  id=''
                  className='bg-transparent text-white font-raleway underline focus:outline-none mr-3'
                >
                  <option value=''>Todo Colombia</option>
                </select>
              </div>
            </div>
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
              <div className="relative inline-block text-left">
                <Menu>
                  {({ open }) => (
                    <>
                      <span className="rounded-md shadow-sm">
                        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                          <span>Options</span>
                          <svg
                            className="w-5 h-5 ml-2 -mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Menu.Button>
                      </span>

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
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
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
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
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
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
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

              <button
                className="w-1/2 sm:w-auto text-white px-6 py-3 mx-auto sm:mx-0 rounded-lg focus:outline-none"
                onClick={handleLogout}
              >
                Salir
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
