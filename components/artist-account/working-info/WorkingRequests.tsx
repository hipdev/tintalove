import format from 'date-fns/format'
import { es } from 'date-fns/locale'
import { getArtistRequests } from 'lib/queries/artists'
import { AiOutlineDelete } from 'react-icons/ai'
import { MdCheckCircle, MdMail } from 'react-icons/md'
import useSWR from 'swr'

const WorkingRequests = ({ artistId }) => {
  const { data } = useSWR(['getArtistRequests', artistId], getArtistRequests)
  console.log(data, 'Solicitudes del artista')
  return (
    <div className="mt-5">
      <h2 className="font-semibold uppercase">Solicitudes actuales</h2>

      <div className="bg-dark-800 shadow  sm:rounded-sm mb-10 mt-2">
        <ul className="divide-y divide-gray-200">
          {data?.requests.map((item) => (
            <li key={item.id} className="block hover:bg-black">
              <div className="flex items-center px-4 py-3 sm:px-6">
                <div className="min-w-0 flex-1 flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={item.studio_picture}
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
                        {item.studio_name}
                      </a>

                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <MdMail
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="truncate">{item.studio_address}</span>
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div>
                        <p className="text-sm text-gray-400">
                          Aplicaste en{' '}
                          <time
                            dateTime={format(
                              item?.created_at.toMillis(),
                              'yyyy'
                            )}
                          >
                            <span className="capitalize">
                              {format(
                                item?.created_at.toMillis(),
                                'MMMM d, yyyy',
                                { locale: es }
                              )}
                            </span>
                          </time>
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <MdCheckCircle
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-primary"
                            aria-hidden="true"
                          />
                          {item.approval}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default WorkingRequests
