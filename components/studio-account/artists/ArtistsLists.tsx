import format from 'date-fns/format'
import { es } from 'date-fns/locale'
import { MdCancel } from 'react-icons/md'
import 'microtip/microtip.css'
import { getArtistsByStudio } from 'lib/queries/studios'
import useSWR from 'swr'
import { parsePhoneNumber } from 'libphonenumber-js'
import toast from 'react-hot-toast'
import { IoMdCall } from 'react-icons/io'

const ArtistsLists = ({ studio }) => {
  const { data, mutate } = useSWR(
    ['getArtistsByStudio', studio?.id],
    getArtistsByStudio
  )

  console.log(data, 'artistas')

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
      {data?.artists.length > 0 ? (
        <>
          <h3 className="mt-4 text-sm">TUS ARTISTAS</h3>

          <div className="bg-dark-800 shadow  sm:rounded-md mb-10 mt-2 ">
            <ul className="divide-y divide-gray-200">
              {data?.artists?.map((request) => {
                return (
                  <li key={request.id} className="block hover:bg-black ">
                    <div className="flex items-center px-4 py-3 sm:px-6">
                      <div className="min-w-0 flex-1 flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="h-12 w-12 rounded-full"
                            src={request.artist_picture}
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
                              {request.artist_name}
                            </a>

                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <IoMdCall
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="truncate">
                                {parsePhoneNumber(
                                  request.artist_phone
                                ).formatInternational()}
                              </span>
                            </p>
                          </div>
                          <div className="hidden md:block">
                            <div>
                              <p className="text-sm text-gray-400">
                                Aceptado en{' '}
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
                      <div className="flex">
                        <div onClick={() => handleDeleteArtist(request.id)}>
                          <div>
                            <span
                              aria-label="Eliminar "
                              data-microtip-position="top"
                              role="tooltip"
                            >
                              <MdCancel
                                className="h-6 w-6 text-red-400 cursor-pointer"
                                aria-hidden="true"
                              />
                            </span>
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

export default ArtistsLists
