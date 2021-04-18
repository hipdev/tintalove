import useArtistWizardRealtime from 'hooks/realtime/use-artist-wizard'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  uid?: string
}

const SideMenuArtist = ({ uid }: Props) => {
  const { artistWizard } = useArtistWizardRealtime(uid)

  const router = useRouter()
  const [path] = router.route.split('/').slice(-1) // get last item from pathName

  console.log(artistWizard, 'wizard artist')
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

  return (
    <div className="mb-10 lg:mb-0">
      <div className="mb-10 mt-12">
        <p className="text-red-500 text-xl font-semibold">Estar en TintaLove</p>
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
        <button className="text-white mb-10 bg-primary px-4">Activar perfil</button>
      )}

      <Link href="/artist/main-info">
        <a className="block relative pb-10">
          <div className="-ml-px absolute mt-6 top-4 left-4 w-0.5 h-8 bg-light-900 border border-dashed"></div>
          <div className="relative flex items-start">
            <span className="h-9 flex items-center">
              <span
                className={
                  path == 'main-info'
                    ? 'border-red-500' + circle
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
                    ? 'border-red-500' + circle
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
                    ? 'border-red-500' + circle
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

      <Link href="/artist/pictures-info">
        <a className="block relative">
          <div className="relative flex items-start">
            <span className="h-9 flex items-center">
              <span
                className={
                  path == 'pictures-info'
                    ? 'border-red-500 ' + circle
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
                Fotos de perfil
              </span>
            </span>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default SideMenuArtist
