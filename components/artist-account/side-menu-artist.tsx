import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  uid?: string
}

const SideMenuArtist = ({ uid }: Props) => {
  const router = useRouter()
  const [path] = router.route.split('/').slice(-1) // get last item from pathName

  const circle =
    ' relative z-10 w-8 h-8 flex items-center justify-center border-2 rounded-full'

  const textWhite = ' text-md tracking-wide'

  return (
    <div className="mb-10 lg:mb-0">
      <div className="mb-10 mt-12">
        <p className="text-primary text-xl font-semibold">Estar en TintaLove</p>
        <h1 className="text-2xl text-white font-bold tracking-wide">
          Es mostrar tu talento
        </h1>
      </div>

      <Link href="/artist/main-info">
        <a className="block relative pb-10">
          <div className="-ml-px absolute mt-6 top-4 left-4 w-0.5 h-8 bg-light-900 border border-dashed"></div>
          <div className="relative flex items-start">
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
