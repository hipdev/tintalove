import { parseISO } from 'date-fns'
import format from 'date-fns/format'
import { es } from 'date-fns/locale'
import { deleteArtistRequest } from 'lib/queries/artists'
import toast from 'react-hot-toast'
import { AiFillWarning, AiOutlineDelete } from 'react-icons/ai'
import { FiHelpCircle } from 'react-icons/fi'
import { GoLocation } from 'react-icons/go'
import { mutate } from 'swr'

const WorkingRequests = ({ requests, artistId }) => {
  const handleDeleteRequest = (request) => {
    toast.promise(deleteArtistRequest(request.id), {
      loading: 'Eliminando...',
      success: () => {
        mutate(['getArtistRequests', artistId])
        return 'Solicitud eliminada'
      },
      error: (err) => {
        return `${err.toString()}`
      },
    })
  }

  const showTitle =
    requests &&
    requests.some(
      (item) => item.status == 'PENDING' || item.status == 'CANCELED'
    )

  return (
    <div className="mt-5">
      {showTitle && (
        <h2 className="font-semibold uppercase">Solicitudes actuales</h2>
      )}

      <div className="bg-dark-800 shadow  sm:rounded-sm mb-10 mt-2">
        <ul className="divide-y divide-gray-200">
          {requests &&
            requests.map((item) => {
              if (item.status != 'APPROVED') {
                return (
                  <li key={item.id} className="block hover:bg-black">
                    <div className="flex items-center px-4 py-3 sm:px-6">
                      <div className="min-w-0 flex-1 flex items-center">
                        <div className="flex-shrink-0">
                          <a
                            href={`/studio/${item?.studios?.username}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              className="h-12 w-12 rounded-full"
                              src={`${item?.studios.studios_main_photos?.url}/tr:w-100,q-20`}
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                          <div>
                            <a
                              href={`/studio/${item?.studios?.username}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <span className="text-sm font-medium text-primary truncate">
                                {item.studios.name}
                              </span>
                            </a>

                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <GoLocation
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="truncate">
                                {item.studios.formatted_address}
                              </span>
                            </p>
                          </div>
                          <div className="hidden md:block">
                            <div>
                              <p className="text-sm text-gray-400">
                                Aplicaste en{' '}
                                <time
                                  dateTime={format(
                                    parseISO(item?.created_at),
                                    'yyyy'
                                  )}
                                >
                                  <span className="capitalize">
                                    {format(
                                      parseISO(item?.created_at),
                                      'MMMM d, yyyy',
                                      {
                                        locale: es,
                                      }
                                    )}
                                  </span>
                                </time>
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500">
                                {item.status == 'PENDING' ? (
                                  <>
                                    <FiHelpCircle
                                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-primary"
                                      aria-hidden="true"
                                    />
                                    <span>Esperando respuesta</span>
                                  </>
                                ) : (
                                  <>
                                    <AiFillWarning
                                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-red-500"
                                      aria-hidden="true"
                                    />
                                    <span className="text-red-500">
                                      Solicitud rechazada
                                    </span>
                                  </>
                                )}
                                {/* Cuando se elimina un artista mostramos esto */}
                                {item?.fired_at && (
                                  <p className="ml-2">
                                    El estudio te ha eliminado en{' '}
                                    <span>
                                      {format(
                                        parseISO(item?.created_at),
                                        'MMMM d, yyyy',
                                        { locale: es }
                                      )}
                                    </span>
                                  </p>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteRequest(item)}
                      >
                        <div>
                          <span
                            aria-label="Eliminar solicitud"
                            data-microtip-position="top"
                            role="tooltip"
                          >
                            <AiOutlineDelete
                              className="h-5 w-5 text-red-400 cursor-pointer"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      </button>
                    </div>
                  </li>
                )
              }
            })}
        </ul>
      </div>
    </div>
  )
}

export default WorkingRequests
