import { VscChevronDown } from 'react-icons/vsc'
import { Menu, Transition } from '@headlessui/react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { signOut } from 'firebase/auth'
import { auth } from 'lib/firebase'
import { createUser, getUserInfo } from 'lib/queries/users'
import useUserId from 'hooks/use-user-id'
import useSWR from 'swr'
import toast from 'react-hot-toast'

const provider = new GoogleAuthProvider()

const StepNav = () => {
  const { userId } = useUserId()

  const { data } = useSWR(userId ? userId : null, getUserInfo)

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast('Vuelve pronto 😁')
      })
      .catch((error) => console.log(error, 'error cerrando sesión'))
  }
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user
        const res = await createUser(user)
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        console.log(errorCode)
      })
  }

  return (
    <nav className="flex flex-col lg:flex-row">
      <div className="flex flex-col md:flex-row items-center">
        {!data?.user && (
          <>
            <button
              onClick={handleLogin}
              className="btn-primary w-auto text-white mx-auto sm:mx-0 rounded-lg focus:outline-none px-6"
            >
              Acceder
            </button>
          </>
        )}
        {data?.user && (
          <>
<<<<<<< HEAD
            <div className="relative text-left z-10 hidden md:block ">
=======
            <div className="relative text-left z-10 hidden md:block">
>>>>>>> 00a03a1c45cfa01887ef360d39b572d37046236b
              <Menu>
                {({ open }) => (
                  <>
                    <Menu.Button className="text-white flex items-center relative transition duration-150 ease-in-out outline-none focus:outline-none">
                      <VscChevronDown className="text-2xl mr-1" />
                      <span>{data.user.displayName}</span>
                      <img
                        className="w-12 rounded-full ml-3"
                        src={data.user.photoUrl}
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
                            {data.user.email}
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
    </nav>
  )
}

export default StepNav
