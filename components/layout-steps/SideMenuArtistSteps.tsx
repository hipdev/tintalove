import { activateArtist, getArtistWizard } from 'lib/queries/artists'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { BsPersonCheck } from 'react-icons/bs'
import useSWR from 'swr'

type Props = {
  uid?: string
}

const SideMenuArtistSteps = ({ uid }: Props) => {
  const { data: artistWizard } = useSWR(
    uid ? ['getArtistWizard', uid] : null,
    getArtistWizard
  )

  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const [path] = router.route.split('/').slice(-1) // get last item from pathName

  const steps = [
    artistWizard?.step_one,
    artistWizard?.step_two,
    artistWizard?.step_three,
    artistWizard?.step_four,
  ]
  const countReadySteps = steps.filter(Boolean).length

  const circle =
    ' relative z-10 w-8 h-8 flex items-center justify-center border-2 rounded-full'

  const textWhite = ' text-md tracking-wide'
  let step = ' w-0'
  let stepValue = '0'

  if (countReadySteps == 1) {
    step = ' w-1/4'
    stepValue = '25'
  }
  if (countReadySteps == 2) {
    step = ' w-2/4'
    stepValue = '50'
  }
  if (countReadySteps == 3) {
    step = ' w-3/4'
    stepValue = '75'
  }
  if (countReadySteps == 4) {
    step = ' w-4/4'
    stepValue = '100'
  }

  const handleActivateProfile = async () => {
    setLoading(true)

    if (countReadySteps == 4) {
      toast.promise(activateArtist(uid), {
        loading: 'Guardando...',
        success: (data) => {
          setLoading(false)
          // setTriggerAuth(Math.random()) // reload global user state data
          // router.push('/artist/new/working-info')

          return 'Artista activado, serás redireccionado a tu perfil en unos segundos... 🥳'
        },
        error: (err) => {
          setLoading(false)
          return `${err.toString()}`
        },
      })
    } else {
      toast.error('Necesitas completar todos los pasos')
      setLoading(false)
    }
  }

  return (
    <div className="mb-10 lg:mb-0">
      <div className="mb-10 mt-12">
        <p className="text-primary text-xl font-semibold">Estar en TintaLove</p>
        <h1 className="text-2xl text-white font-bold tracking-wide">
          Es mostrar tu talento
        </h1>
      </div>

      <div className="mb-10">
        <div className="h-3 w-64 bg-gray-800 rounded-xl relative">
          <div
            className={`h-3 ${step} transition-width bg-primary rounded-xl`}
          ></div>
        </div>
        <span className="text-white text-sm block mt-2">
          {stepValue}% Completado
        </span>
      </div>

      {countReadySteps == 4 && (
        <button
          onClick={handleActivateProfile}
          className="text-white mb-10 bg-primary px-4 rounded-sm py-2 flex items-center hover:bg-primaryHover"
          disabled={loading}
        >
          Activar perfil
          <BsPersonCheck className="text-xl ml-2" />
        </button>
      )}

      <Link href="/artist/main-info">
        <a className="block relative pb-10">
          <div className="-ml-px absolute mt-6 top-4 left-4 w-0.5 h-8 bg-light-900 border border-dashed"></div>
          <div className="relative flex items-start">
            <span className="h-9 flex items-center">
              <span
                className={
                  path == 'main-info'
                    ? 'border-primary' + circle
                    : 'border-light-900' + circle
                }
              >
                <span
                  className={
                    path == 'main-info' ? 'text-white' : 'text-light-900'
                  }
                >
                  1
                </span>
              </span>
            </span>
            <span className="ml-4 min-w-0 mt-1.5">
              <span
                className={
                  path == 'main-info'
                    ? 'text-white ' + textWhite
                    : 'text-light-900 ' + textWhite
                }
              >
                Información personal
              </span>
            </span>
          </div>
        </a>
      </Link>

      <Link href="/artist/working-info">
        <a className="block relative pb-10">
          <div className="-ml-px absolute mt-6 top-4 left-4 w-0.5 h-8 bg-light-900 border border-dashed"></div>
          <div className="relative flex items-start">
            <span className="h-9 flex items-center">
              <span
                className={
                  path == 'working-info'
                    ? 'border-primary' + circle
                    : 'border-light-900' + circle
                }
              >
                <span
                  className={
                    path == 'working-info' ? 'text-white' : 'text-light-900'
                  }
                >
                  2
                </span>
              </span>
            </span>
            <span className="ml-4 min-w-0 mt-1.5">
              <span
                className={
                  path == 'working-info'
                    ? 'text-white ' + textWhite
                    : 'text-light-900 ' + textWhite
                }
              >
                Información laboral
              </span>
            </span>
          </div>
        </a>
      </Link>

      <Link href="/artist/contact-info">
        <a className="block relative pb-10">
          <div className="-ml-px absolute mt-6 top-4 left-4 w-0.5 h-8 bg-light-900 border border-dashed"></div>
          <div className="relative flex items-start">
            <span className="h-9 flex items-center">
              <span
                className={
                  path == 'contact-info'
                    ? 'border-primary' + circle
                    : 'border-light-900' + circle
                }
              >
                <span
                  className={
                    path == 'contact-info' ? 'text-white' : 'text-light-900'
                  }
                >
                  3
                </span>
              </span>
            </span>
            <span className="ml-4 min-w-0 mt-1.5">
              <span
                className={
                  path == 'contact-info'
                    ? 'text-white ' + textWhite
                    : 'text-light-900 ' + textWhite
                }
              >
                Información de Contacto
              </span>
            </span>
          </div>
        </a>
      </Link>

      <Link href="/artist/photos-info">
        <a className="block relative">
          <div className="relative flex items-start">
            <span className="h-9 flex items-center">
              <span
                className={
                  path == 'photos-info'
                    ? 'border-primary ' + circle
                    : 'border-light-900 ' + circle
                }
              >
                <span
                  className={
                    path == 'photos-info' ? 'text-white' : 'text-light-900'
                  }
                >
                  4
                </span>
              </span>
            </span>
            <span className="ml-4 min-w-0 mt-1.5">
              <span
                className={
                  path == 'photos-info'
                    ? 'text-white ' + textWhite
                    : 'text-light-900 ' + textWhite
                }
              >
                Fotos de perfil
              </span>
            </span>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default SideMenuArtistSteps
