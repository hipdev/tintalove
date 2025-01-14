import format from 'date-fns/format'
import { es } from 'date-fns/locale'
import { MdCancel, MdMail } from 'react-icons/md'
import 'microtip/microtip.css'
import {
  acceptArtistRequest,
  cancelArtistRequest,
  getRequestsByStudio,
} from 'lib/queries/studios'
import useSWR, { mutate } from 'swr'
import { parsePhoneNumber } from 'libphonenumber-js'
import { BsPersonCheck } from 'react-icons/bs'
import { FiHelpCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { parseISO } from 'date-fns'

const ArtistsRequests = ({ studio, uid }) => {
  const { data: requests, mutate: mutateRequest } = useSWR(
    ['getRequestsByStudio', studio?.id],
    getRequestsByStudio
  )

  const handleDeleteRequest = (requestId) => {
    toast.promise(cancelArtistRequest(requestId), {
      loading: 'Eliminando...',
      success: () => {
        mutateRequest()
        return 'Solicitud eliminada'
      },
      error: (err) => {
        return `${err.toString()}`
      },
    })
  }
  const handleAcceptRequest = (request) => {
    toast.promise(acceptArtistRequest(request, uid), {
      loading: 'Aceptando...',
      success: () => {
        mutateRequest()
        mutate(['getArtistsByStudio', studio?.id])
        return 'Solicitud aceptada'
      },
      error: (err) => {
        return `${err.toString()}`
      },
    })
  }

  return (
    <>
      <h3 className="mt-4 text-sm">SOLICITUDES ACTUALES</h3>

      <div className="bg-dark-800 shadow  sm:rounded-sm mb-10 mt-2">
        <ul className="divide-y divide-gray-200">
          {requests?.length > 0 ? (
            requests?.map((request) => {
              return (
                <li key={request.id} className="block hover:bg-gray-900">
                  <div className="flex items-center px-4 py-3 sm:px-6">
                    <div className="min-w-0 flex-1 flex items-center">
                      <div className="flex-shrink-0">
                        <a
                          href={`/${request?.artists?.username}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            className="h-12 w-12 rounded-full"
                            src={`${request?.artists?.artists_main_photos?.url}/tr:w-100,q-40`}
                            alt=""
                          />
                        </a>
                      </div>
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <a
                            href={`/${request?.artists?.username}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span className="text-sm font-medium text-primary truncate">
                              {request?.artists?.name}
                            </span>
                          </a>

                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            <MdMail
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="truncate">
                              {parsePhoneNumber(
                                request?.artists?.mobile.value
                              ).formatInternational()}
                            </span>
                          </p>
                        </div>
                        <div className="hidden md:block">
                          <div>
                            <p className="text-sm text-gray-400">
                              Aplicó en{' '}
                              <time
                                dateTime={format(
                                  parseISO(request?.created_at),
                                  'yyyy'
                                )}
                              >
                                <span className="capitalize">
                                  {format(
                                    parseISO(request?.created_at),
                                    'MMMM d, yyyy',
                                    { locale: es }
                                  )}
                                </span>
                              </time>
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <FiHelpCircle
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-primary"
                                aria-hidden="true"
                              />
                              <span>Esperando respuesta</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      <div onClick={() => handleDeleteRequest(request.id)}>
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

                      <div
                        className="ml-7"
                        onClick={() => handleAcceptRequest(request)}
                      >
                        <span
                          aria-label="Aceptar "
                          data-microtip-position="top"
                          role="tooltip"
                        >
                          <BsPersonCheck
                            className="h-6 w-6 text-primary cursor-pointer"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })
          ) : (
            <p key="no-request" className="text-gray-300 p-4">
              Sin solicitudes actualmente.
            </p>
          )}
        </ul>
      </div>
    </>
  )
}

export default ArtistsRequests
