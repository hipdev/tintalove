import dynamic from 'next/dynamic'
import { VscChevronDown } from 'react-icons/vsc'
import { Menu, Transition } from '@headlessui/react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { signOut } from 'firebase/auth'
import { auth } from 'lib/firebase'
import { UserState } from 'types/user'
import { createUser } from 'lib/queries/users'
// import LoginModal from './LoginModal'
import { mutate } from 'swr'
import { useContext } from 'react'
import { LoginContext } from 'pages/_app'
import Link from 'next/link'

const LoginModal = dynamic(() => import('./LoginModal'))

const provider = new GoogleAuthProvider().setCustomParameters({
  prompt: 'select_account',
})

const SubMenuHeader = ({ user }: { user: UserState }) => {
  const { isOpen, setIsOpen, openModal } = useContext(LoginContext)

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user
        const res = await createUser(user)

        if (res) {
          mutate(user.uid)
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        console.log(errorCode)
      })
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // actions.login(null)

        //Debemos cerrar el modal porque al volver a quedar con el user vacio este se estaba mostrando
        setIsOpen(false)
      })
      .catch((error) => console.log(error, 'error cerrando sesión'))
  }

  return (
    <>
      {!user && (
        <>
          {isOpen && (
            <LoginModal
              modal={{ isOpen, setIsOpen }}
              handleLogin={handleLogin}
            />
          )}

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
                      className="w-12 h-12 rounded-full"
                      src={
                        user.photoUrl
                          ? `${user.photoUrl}/tr:pr-true,c-at_max,f-auto,w-50,q-90`
                          : '/unuser.png'
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
                          {user.email || user.displayName || 'Sin nombre'}
                        </p>
                      </div>

                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href={
                                user?.artist_active
                                  ? '/artist/main-info'
                                  : '/user/profile'
                              }
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

                        {user?.has_studio && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link href="/studio-account/general">
                                <a
                                  className={`${
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700'
                                  } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                >
                                  Administrar estudio
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                        )}

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
                        {/* <Menu.Item
                          as="span"
                          disabled
                          className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50"
                        >
                          New feature (soon)
                        </Menu.Item> */}
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
    </>
  )
}

export { provider }

export default SubMenuHeader
