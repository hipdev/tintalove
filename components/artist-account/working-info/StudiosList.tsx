import format from 'date-fns/format'
import { es } from 'date-fns/locale'
import 'microtip/microtip.css'
import useSWR from 'swr'
import { IoMdPin } from 'react-icons/io'
import { getStudiosByUserId } from 'lib/queries/artists'
import { parseISO } from 'date-fns'

const StudiosList = ({ uid }) => {
  const { data: studios } = useSWR(
    ['getStudiosByUserId', uid],
    getStudiosByUserId
  )

  return (
    <>
      {studios?.length > 0 ? (
        <>
          <h3 className="mt-4 text-sm">HACES PARTE DE</h3>

          <div className="bg-dark-800 shadow  sm:rounded-md mb-10 mt-2 ">
            <ul className="divide-y divide-gray-200">
              {studios?.map((studio) => {
                return (
                  <li key={studio.id} className="block hover:bg-black ">
                    <div className="flex items-center px-4 py-3 sm:px-6">
                      <div className="min-w-0 flex-1 flex items-center">
                        <div className="flex-shrink-0">
                          <a
                            href={`/studio/${studio?.studios?.username}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              className="h-12 w-12 rounded-full"
                              src={`${studio?.studios.studios_main_photos?.url}/tr:w-100,q-20`}
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                          <div>
                            <a
                              href={`/studio/${studio?.studios?.username}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <span className="text-sm font-medium text-primary truncate">
                                {studio.studios.name}
                              </span>
                            </a>

                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <IoMdPin
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="truncate">
                                {studio.studios.formatted_address}
                              </span>
                            </p>
                          </div>
                          <div className="hidden md:block">
                            <div>
                              <p className="text-sm text-gray-400">
                                Te aceptarón en{' '}
                                <time
                                  dateTime={format(
                                    parseISO(studio?.created_at),
                                    'yyyy'
                                  )}
                                >
                                  <span className="capitalize">
                                    {format(
                                      parseISO(studio?.created_at),
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
