import { ArtistTypes } from 'types/artist'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import useUserId from 'hooks/use-user-id'
import useSWR from 'swr'
import { getUserInfo } from 'lib/queries/users'
import { useState } from 'react'
import { IoMdCloseCircle } from 'react-icons/io'
import { useRouter } from 'next/router'

type Props = {
  artistData: ArtistTypes
}

const ArtistMap = ({ artistData }: Props) => {
  console.log(artistData, 'data del artista, me cargaron bb')
  const router = useRouter()

  const [openLocationModal, setOpenLocationModal] = useState(false)

  const { userId } = useUserId()
  const { data } = useSWR(userId ? userId : null, getUserInfo)

  return (
    <>
      <Transition.Root show={openLocationModal} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed z-10 inset-0 overflow-y-auto"
          open={true}
          onClose={() => router.push(`/${artistData.username}`)}
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
                    onClick={() => router.push(`/${artistData.username}`)}
                  >
                    <IoMdCloseCircle />
                  </button>
                  Hola, soy el modal del mapa
                  <div className="h-20 bg-black w-40">ja</div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default ArtistMap
