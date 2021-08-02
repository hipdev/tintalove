import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment } from 'react'
import { IoMdCloseCircle } from 'react-icons/io'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import SliderPictures from './SliderPictures'

const loaderPost = ({ src, quality }: any) => {
  return `${src}/tr:pr-true,c-at_max,f-auto,h-820,q-${quality || 75}`
}

type Props = {
  openModal: boolean
  setOpenModal: any
  pictures: [any]
  profilePicture: string
}

const ModalPictures = ({
  openModal,
  setOpenModal,
  pictures,
  profilePicture,
}: Props) => {
  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <div className="flex items-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity cursor-pointer" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="absolute mx-auto left-0 right-0 bg-transparent justify-center h-full  w-11/12 sm:w-1/2 2xl:w-2/5 top-5 flex flex-col items-center">
              <div className="relative">
                <button
                  type="button"
                  className="absolute text-white hover:text-gray-300 -top-10 right-0  text-2xl sm:text-4xl z-10"
                  onClick={() => setOpenModal(false)}
                >
                  <IoMdCloseCircle />
                </button>
                {pictures?.length < 1 ? (
                  <div className="w-full relative">
                    <div
                      className="aspect-w-3 aspect-h-4 relative max-h-20"
                      onClick={() => setOpenModal(true)}
                    >
                      {profilePicture ? (
                        <Image
                          loader={loaderPost}
                          src={profilePicture}
                          alt={`Foto maximizada`}
                          layout="fill" // el fill obliga a que se adapte al padre
                          // width={600}
                          // height={500}
                          // sizes="100%"
                          loading="lazy"
                          quality={100}
                          className="w-full  object-cover"
                        />
                      ) : (
                        <img
                          src="https://via.placeholder.com/309x287"
                          alt="Sin foto de perfil"
                          className="w-full"
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <SliderPictures
                    pictures={pictures}
                    profilePicture={profilePicture}
                  />
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ModalPictures
