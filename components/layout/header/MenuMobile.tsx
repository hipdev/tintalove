/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoMdClose } from 'react-icons/io'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import Image from 'next/image'
import { AiOutlineInstagram } from 'react-icons/ai'
// import { UserState } from 'types/user'

const MenuMobile = ({ user }: any) => {
  const [open, setOpen] = useState(false)

  console.log(user, 'usuario')

  return (
    <>
      <div className="flex items-center">
        <button
          onClick={() => setOpen(true)}
          className="text-white text-3xl block md:hidden"
        >
          <HiOutlineMenuAlt2 />
        </button>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden"
          onClose={setOpen}
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
                              onClick={() => setOpen(false)}
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
                        {/* /End replace */}
                      </div>
                    </div>
                    <div className="flex-shrink-0 px-4 py-4 flex justify-between items-center bg-gr-900">
                      <button className="bg-primary text-gray-300 px-7 py-3 font-semibold uppercase rounded-sm hover:bg-primaryHover">
                        Ingresar
                      </button>
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
