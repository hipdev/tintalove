import Link from 'next/link'
import { useRouter } from 'next/router'

const SideMenu = () => {
  const router = useRouter()
  const [path] = router.route.split('/').slice(-1) // get last item from pathName

  console.log(path, 'esto')

  const circle =
    ' relative z-10 w-8 h-8 flex items-center justify-center border-2 rounded-full'

  const textWhite = ' text-md tracking-wide'

  return (
    <div className="mb-10 lg:mb-0">
      <div className="mb-10 mt-12">
        <p className="text-red-500 text-xl font-semibold">Estar en TintaLove</p>
        <h1 className="text-2xl text-white font-bold tracking-wide">
          Es mostrar tu talento
        </h1>
      </div>

      <Link href="/artist/new/main-info">
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

      <Link href="/artist/new/working-info">
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

      <Link href="/artist/new/contact-info">
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
                Información laboral
              </span>
            </span>
          </div>
        </a>
      </Link>

      <Link href="/artist/new/picture-info">
        <a className="block relative">
          <div className="relative flex items-start">
            <span className="h-9 flex items-center">
              <span
                className={
                  path == 'picture-info'
                    ? 'border-red-500 ' + circle
                    : 'border-light-900 ' + circle
                }
              >
                <span
                  className={
                    path == 'picture-info' ? 'text-white' : 'text-light-900'
                  }
                >
                  4
                </span>
              </span>
            </span>
            <span className="ml-4 min-w-0 mt-1.5">
              <span
                className={
                  path == 'picture-info'
                    ? 'text-white ' + textWhite
                    : 'text-light-900 ' + textWhite
                }
              >
                Foto de perfil
              </span>
            </span>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default SideMenu
