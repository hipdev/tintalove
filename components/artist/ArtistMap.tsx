import { ArtistTypes } from 'types/artist'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'
import { IoMdCloseCircle } from 'react-icons/io'
import { SiGooglemaps, SiWaze } from 'react-icons/si'
import { useRouter } from 'next/router'
import Image from 'next/image'

type Props = {
  artistData: ArtistTypes
}

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '4px',
}

const ArtistMap = ({ artistData }: Props) => {
  const router = useRouter()

  const ref = useRef()

  return (
    <>
      <Transition.Root show={true} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed z-10 inset-0 overflow-y-auto"
          open={true}
          onClose={() => router.push(`/${artistData.username}`)}
          initialFocus={ref}
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
              <div className="absolute mx-auto  left-0 right-0 bg-transparent justify-center h-full  w-11/12 sm:w-10/12  top-0 sm:top-5 flex flex-col items-center">
                <div className="relative h-5/6   w-full px-7 rounded-md bg-gr-700 pb-10">
                  <button
                    type="button"
                    className="absolute text-white hover:text-gray-300 -top-10 right-0  text-2xl sm:text-4xl z-10"
                    onClick={() => router.push(`/${artistData.username}`)}
                  >
                    <IoMdCloseCircle />
                  </button>
                  <h1 className="mt-5 text-gray-300 text-2xl font-semibold mb-4">
                    Ubicación de {artistData.displayName}
                  </h1>
                  <div className="text-left text-gray-400 mb-8 flex justify-around">
                    <div className="mr-2">
                      <p className="text-sm sm:text-md">
                        <span className="hidden sm:inline-block font-semibold mr-2">
                          Dirección:
                        </span>
                        {artistData.formatted_address}
                      </p>
                      <p className="text-sm sm:text-md ">
                        <span className="hidden sm:inline-block font-semibold mr-2">
                          Horarios:
                        </span>
                        {artistData.times}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        ref={ref}
                        href={`https://www.waze.com/ul?ll=${
                          artistData._geoloc_marker.lat ||
                          artistData._geoloc.lat
                        },${
                          artistData._geoloc_marker.lng ||
                          artistData._geoloc.lng
                        }&navigate=yes&zoom=10`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ backgroundColor: '#33ccff' }}
                        className=" flex px-2 sm:px-3 py-2 text-black rounded-full sm:rounded-md font-semibold items-center"
                      >
                        <span className="hidden sm:inline-block ">
                          Abrir con Waze
                        </span>
                        <SiWaze className=" sm:ml-2 text-3xl sm:text-2xl text-gray-700" />
                      </a>
                      <a
                        href={`https://maps.google.com/?q=${
                          artistData._geoloc_marker.lat ||
                          artistData._geoloc.lat
                        },${
                          artistData._geoloc_marker.lng ||
                          artistData._geoloc.lng
                        }`}
                        target="_blank"
                        rel="noreferrer"
                        className=" flex px-2 sm:px-2 py-2 text-gr-700 bg-gray-200 rounded-full sm:rounded-md font-semibold items-center justify-center"
                      >
                        <span className="hidden sm:inline-block ">
                          Abrir con Maps
                        </span>
                        <Image
                          src="/maps-icon.png"
                          alt="Google maps Icon"
                          width={28}
                          height={28}
                        />
                      </a>
                    </div>
                  </div>
                  <div className="h-4/5 mb-20 bg-black ">
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={{
                        lat:
                          artistData._geoloc_marker.lat ||
                          artistData._geoloc.lat,
                        lng:
                          artistData._geoloc_marker.lng ||
                          artistData._geoloc.lng,
                      }}
                      zoom={18}
                      options={{
                        streetViewControl: false,
                        mapTypeControl: false,
                      }}
                    >
                      <Marker
                        position={{
                          lat:
                            artistData._geoloc_marker.lat ||
                            artistData._geoloc.lat,
                          lng:
                            artistData._geoloc_marker.lng ||
                            artistData._geoloc.lng,
                        }}
                        icon={{
                          url: '/icon-black.png',
                        }}
                        label={{
                          text: artistData.displayName,
                          color: '#030308',
                          fontSize: '1.4rem',
                          fontWeight: '900',
                          className: 'marker-position',
                        }}
                      />
                    </GoogleMap>
                  </div>
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
