import { signOut } from 'firebase/auth'
import { auth } from 'lib/firebase'
import { useContext } from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoMdClose } from 'react-icons/io'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import Image from 'next/image'
import { AiOutlineInstagram } from 'react-icons/ai'
import { ImUser } from 'react-icons/im'
import { LoginContext } from 'pages/_app'
import { FaPencilAlt } from 'react-icons/fa'
import { RiBuilding4Line } from 'react-icons/ri'
import Link from 'next/link'

const MenuMobile = ({ user }: any) => {
  const [openMobile, setOpenMobile] = useState(false)
  const { isOpen, openModal } = useContext(LoginContext)

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // actions.login(null)
        //Debemos cerrar el modal porque al volver a quedar con el user vacio este se estaba mostrando
        // setIsOpen(false)
      })
      .catch((error) => console.log(error, 'error cerrando sesión'))
  }

  // console.log(isOpen, 'showIsOpen')

  return (
    <>
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => {
            console.log('aa')
            setOpenMobile(true)
          }}
          className="text-white text-3xl block md:hidden"
        >
          <HiOutlineMenuAlt2 />
        </button>
      </div>
      <Transition.Root show={openMobile} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden z-40"
          onClose={() => null} // Así evito que se cierre siempre que le den afuera
          // static
        >
          <div className="absolute inset-0 overflow-hidden">
            <Dialog.Overlay className="absolute inset-0" />

            <div className="fixed inset-y-0 right-0 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-md">
                  <div className="h-full flex flex-col bg-gr-800 shadow-xl">
                    <div className="min-h-0 flex-1 flex flex-col py-6 overflow-y-scroll">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            <Image
                              // layout="fill"
                              width={180}
                              height={35}
                              src="/short-logo.png"
                              alt="Logo Tinta Love"
                              loading="eager"
                            />
                          </Dialog.Title>
                          <div className="ml-3 h-7 flex items-center">
                            <button
                              type="button"
                              className="rounded-md text-gray-300 hover:text-gray-500 "
                              onClick={() => setOpenMobile(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <IoMdClose
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 relative flex-1 px-4 sm:px-6">
                        {/* Replace with your content */}
                        {!user && (
                          <div className="text-gray-400">
                            <h2 className="font-semibold text-gray-300 text-xl mb-5">
                              Modo Beta
                            </h2>
                            <p>
                              Queremos agradecer tu interés en nuestra
                              iniciativa, por el momento estamos haciendo
                              pruebas, acércate a nuestro stand en Plaza Mayor,
                              también puedes ingresar y ver lo que estamos
                              haciendo, somos gratis.
                            </p>
                            <p className="mt-3">Gracias por tu apoyo</p>
                            <p>Saludos, equipo Tinta Love.</p>
                          </div>
                        )}
                        {user && (
                          <div className="text-gray-400">
                            <h2 className="font-semibold text-gray-300 text-xl mb-5">
                              {user?.displayName !== 'Sin nombre'
                                ? `Hola ${user.displayName}`
                                : null}
                            </h2>
                            <p>
                              Ahora puedes crear listas de favoritos, comentar
                              las publicaciones y registrarte como artista o
                              como estudio.
                            </p>
                            <nav className="mt-10 flex flex-col text-2xl divide-y divide-gray-600 text-gray-200 font-light">
                              <a className="py-3 flex justify-between items-center">
                                Mi perfil <ImUser />
                              </a>
                              <Link href="/artist/main-info">
                                <a className="py-3 flex justify-between items-center">
                                  Soy un artista <FaPencilAlt />
                                </a>
                              </Link>
                              <Link href="/studio-account/general">
                                <a className="py-3 flex justify-between items-center">
                                  Registrar estudio <RiBuilding4Line />
                                </a>
                              </Link>
                            </nav>
                          </div>
                        )}
                        {/* /End replace */}
                      </div>
                    </div>
                    <div className="flex-shrink-0 px-4 py-4 flex justify-between items-center bg-gr-900">
                      {user && (
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="text-gray-300 px-7 py-3 font-semibold uppercase rounded-sm hover:bg-primaryHover"
                        >
                          Salir
                        </button>
                      )}
                      {!user && (
                        <button
                          type="button"
                          onClick={openModal}
                          className="bg-primary text-gray-300 px-7 py-3 font-semibold uppercase rounded-sm hover:bg-primaryHover"
                        >
                          Ingresar
                        </button>
                      )}
                      <div>
                        <a
                          className="text-white text-4xl "
                          href="https://www.instagram.com/tinta.love/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <AiOutlineInstagram />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default MenuMobile
