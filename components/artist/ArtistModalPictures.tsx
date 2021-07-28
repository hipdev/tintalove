import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { IoMdCloseCircle } from 'react-icons/io'

const ArtistModalPictures = ({
  openModalPics,
  setOpenModalPics,
  artistPics,
}: any) => {
  return (
    <Transition.Root show={openModalPics} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={openModalPics}
        onClose={() => setOpenModalPics(false)}
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
            <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
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
            <div className="absolute w-auto mx-auto left-0 right-0 bg-white h-1/2 mt-10">
              <button
                type="button"
                className=""
                // onClick={() => removeFromList()}
              >
                <IoMdCloseCircle />
              </button>
              {artistPics?.length == 0 ? (
                <div>La foto grande</div>
              ) : (
                <div>Slider de fotos</div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ArtistModalPictures
