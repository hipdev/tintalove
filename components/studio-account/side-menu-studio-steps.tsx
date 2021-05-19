import useArtistWizardRealtime from 'hooks/realtime/use-artist-wizard'
import useStudioWizardRealtime from 'hooks/realtime/use-studio-wizard'
import { useUserData } from 'hooks/use-user-data'
import { activateArtist } from 'lib/queries/artists'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { BsPersonCheck } from 'react-icons/bs'

type Props = {
  uid?: string
  studioId?: string
}

const SideMenuStudioSteps = ({ studioId }: Props) => {
  const { studioWizard } = useStudioWizardRealtime(studioId)

  const [loading, setLoading] = useState(false)
  const { setTriggerAuth } = useUserData()

  const router = useRouter()
  const [path] = router.route.split('/').slice(-1) // get last item from pathName

  const steps = [
    studioWizard?.step_one,
    studioWizard?.step_two,
    studioWizard?.step_three,
    studioWizard?.step_four,
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
      toast.promise(activateArtist(studioId), {
        loading: 'Guardando...',
        success: (data) => {
          setLoading(false)
          setTriggerAuth(Math.random()) // reload global user state data
          // router.push('/artist/new/working-info')

          return 'Estudio activado, serás redireccionado a tu perfil en unos segundos... 🥳'
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
      <Toaster
        toastOptions={{
          className: 'bg-red-600',
          style: {
            background: '#ef3e30',
            border: 'none',
            borderRadius: '3px',
            color: '#fff',
          },
          duration: 20000,
        }}
        position="bottom-right"
      />
      <div className="mb-10 mt-12">
        <p className="text-primary text-xl font-semibold">Estar en TintaLove</p>
        <h1 className="text-2xl text-white font-bold tracking-wide">
          Es mostrarte al mundo
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
          Activar estudio
          <BsPersonCheck className="text-xl ml-2" />
        </button>
      )}

      <Link href="/studio-account/general">
        <a className="block relative pb-10">
          <div className="-ml-px absolute mt-6 top-4 left-4 w-0.5 h-8 bg-light-900 border border-dashed"></div>
          <div className="relative flex items-start">
            <span className="h-9 flex items-center">
              <span
                className={
                  path == 'general'
                    ? 'border-primary' + circle
                    : 'border-light-900' + circle
                }
              >
                <span
                  className={
                    path == 'general' ? 'text-white' : 'text-light-900'
                  }
                >
                  1
                </span>
              </span>
            </span>
            <span className="ml-4 min-w-0 mt-1.5">
              <span
                className={
                  path == 'general'
                    ? 'text-white ' + textWhite
                    : 'text-light-900 ' + textWhite
                }
              >
                Información general
              </span>
            </span>
          </div>
        </a>
      </Link>

      <Link href="/studio-account/artists">
        <a className="block relative pb-10">
          <div className="-ml-px absolute mt-6 top-4 left-4 w-0.5 h-8 bg-light-900 border border-dashed"></div>
          <div className="relative flex items-start">
            <span className="h-9 flex items-center">
              <span
                className={
                  path == 'artists'
                    ? 'border-primary' + circle
                    : 'border-light-900' + circle
                }
              >
                <span
                  className={
                    path == 'artists' ? 'text-white' : 'text-light-900'
                  }
                >
                  2
                </span>
              </span>
            </span>
            <span className="ml-4 min-w-0 mt-1.5">
              <span
                className={
                  path == 'artists'
                    ? 'text-white ' + textWhite
                    : 'text-light-900 ' + textWhite
                }
              >
                Artistas
              </span>
            </span>
          </div>
        </a>
      </Link>

      <Link href="/studio-account/contact-info">
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

      <Link href="/studio-account/pictures-info">
        <a className="block relative">
          <div className="relative flex items-start">
            <span className="h-9 flex items-center">
              <span
                className={
                  path == 'pictures-info'
                    ? 'border-primary ' + circle
                    : 'border-light-900 ' + circle
                }
              >
                <span
                  className={
                    path == 'pictures-info' ? 'text-white' : 'text-light-900'
                  }
                >
                  4
                </span>
              </span>
            </span>
            <span className="ml-4 min-w-0 mt-1.5">
              <span
                className={
                  path == 'pictures-info'
                    ? 'text-white ' + textWhite
                    : 'text-light-900 ' + textWhite
                }
              >
                Fotos del estudio
              </span>
            </span>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default SideMenuStudioSteps
