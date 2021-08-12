import format from 'date-fns/format'
import { es } from 'date-fns/locale'
import { MdCancel } from 'react-icons/md'
import 'microtip/microtip.css'
import { deleteArtistFromStudio, getArtistsByStudio } from 'lib/queries/studios'
import useSWR from 'swr'
import { parsePhoneNumber } from 'libphonenumber-js'
import toast from 'react-hot-toast'
import { IoMdCall } from 'react-icons/io'
import GetUsernameLink from 'components/common/GetUsernameLink'

const ArtistsLists = ({ studio }) => {
  const { data, mutate } = useSWR(
    ['getArtistsByStudio', studio?.id],
    getArtistsByStudio
  )

  console.log(data, 'artists')

  const handleDeleteArtistFromStudio = (studioArtist) => {
    toast.promise(deleteArtistFromStudio(studioArtist), {
      loading: 'Eliminando...',
      success: () => {
        mutate()
        return 'Artista eliminado'
      },
      error: (err) => {
        return `${err.toString()}`
      },
    })
  }

  return (
    <>
      {data?.artists.length > 0 ? (
        <>
          <h3 className="mt-4 text-sm">TUS ARTISTAS</h3>

          <div className="bg-dark-800 shadow  sm:rounded-md mb-10 mt-2 ">
            <ul className="divide-y divide-gray-200">
              {data?.artists?.map((artist) => {
                return (
                  <li key={artist.id} className="block hover:bg-black ">
                    <div className="flex items-center px-4 py-3 sm:px-6">
                      <div className="min-w-0 flex-1 flex items-center">
                        <div className="flex-shrink-0">
                          <GetUsernameLink
                            id={artist.artist_id}
                            type="artist"
                            target
                          >
                            <img
                              className="h-12 w-12 rounded-full"
                              src={artist.artist_picture}
                              alt=""
                            />
                          </GetUsernameLink>
                        </div>
                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                          <div>
                            <GetUsernameLink
                              id={artist.artist_id}
                              type="artist"
                              target
                            >
                              <span className="text-sm font-medium text-primary truncate">
                                {artist.artist_name}
                              </span>
                            </GetUsernameLink>

                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <IoMdCall
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="truncate">
                                {parsePhoneNumber(
                                  artist.artist_phone
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
                                    artist?.created_at.toMillis(),
                                    'yyyy'
                                  )}
                                >
                                  <span className="capitalize">
                                    {format(
                                      artist?.created_at.toMillis(),
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
                        <div
                          onClick={() => handleDeleteArtistFromStudio(artist)}
                        >
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
