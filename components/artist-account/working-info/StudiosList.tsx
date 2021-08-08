import format from 'date-fns/format'
import { es } from 'date-fns/locale'
import { MdCancel } from 'react-icons/md'
import 'microtip/microtip.css'
import useSWR from 'swr'
import { parsePhoneNumber } from 'libphonenumber-js'
import toast from 'react-hot-toast'
import { IoMdCall } from 'react-icons/io'
import { getStudiosByArtistId } from 'lib/queries/artists'

const StudiosList = ({ artistId }) => {
  const { data, mutate } = useSWR(
    ['getStudiosByArtistId', artistId],
    getStudiosByArtistId
  )

  console.log(data, 'estudios')

  const handleDeleteArtist = (requestId) => {
    // toast.promise(cancelArtistRequest(requestId), {
    //   loading: 'Eliminando...',
    //   success: () => {
    //     mutate()
    //     return 'Solicitud eliminada'
    //   },
    //   error: (err) => {
    //     return `${err.toString()}`
    //   },
    // })
  }

  return (
    <>
      {data?.studios.length > 0 ? (
        <>
          <h3 className="mt-4 text-sm">HACES PARTE DE</h3>

          <div className="bg-dark-800 shadow  sm:rounded-md mb-10 mt-2 ">
            <ul className="divide-y divide-gray-200">
              {data?.studios?.map((request) => {
                return (
                  <li key={request.id} className="block hover:bg-black ">
                    <div className="flex items-center px-4 py-3 sm:px-6">
                      <div className="min-w-0 flex-1 flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="h-12 w-12 rounded-full"
                            src={request.studio_picture}
                            alt=""
                          />
                        </div>
                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                          <div>
                            <a
                              href="#"
                              rel="noreferrer"
                              target="_blank"
                              className="text-sm font-medium text-primary truncate"
                            >
                              {request.studio_name}
                            </a>

                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <IoMdCall
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="truncate">
                                {request.studio_address}
                              </span>
                            </p>
                          </div>
                          <div className="hidden md:block">
                            <div>
                              <p className="text-sm text-gray-400">
                                Te aceptarón en{' '}
                                <time
                                  dateTime={format(
                                    request?.created_at.toMillis(),
                                    'yyyy'
                                  )}
                                >
                                  <span className="capitalize">
                                    {format(
                                      request?.created_at.toMillis(),
                                      'MMMM d, yyyy',
                                      { locale: es }
                                    )}
                                  </span>
                                </time>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </>
      ) : null}
    </>
  )
}

export default StudiosList
