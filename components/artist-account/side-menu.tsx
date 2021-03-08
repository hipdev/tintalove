import Link from 'next/link'

const SideMenu = () => {
  return (
    <div className="mb-10 lg:mb-0">
      <div className="mb-10 mt-12">
        <p className="text-red-500 text-xl font-semibold">Estar en TintaLove</p>
        <h1 className="text-2xl text-white font-bold tracking-wide">
          Es mostrar tu talento
        </h1>
      </div>

      <Link href="/artist/new">
        <a className="block relative pb-10">
          <div className="-ml-px absolute mt-6 top-4 left-4 w-0.5 h-8 bg-light-900 border border-dashed"></div>
          <div className="relative flex items-start">
            <span className="h-9 flex items-center">
              <span className="relative z-10 w-8 h-8 flex items-center justify-center border-2 border-red-500 rounded-full">
                <span className="text-white">1</span>
              </span>
            </span>
            <span className="ml-4 min-w-0 mt-1.5">
              <span className="text-md text-white tracking-wide">
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
              <span className="relative z-10 w-8 h-8 flex items-center justify-center border-2 border-light-900 rounded-full">
                <span className="text-light-900">2</span>
              </span>
            </span>
            <span className="ml-4 min-w-0 mt-1.5">
              <span className="text-md text-light-900 tracking-wide">
                Información laboral
              </span>
            </span>
          </div>
        </a>
      </Link>

      <Link href="">
        <a className="block relative pb-10">
          <div className="-ml-px absolute mt-6 top-4 left-4 w-0.5 h-8 bg-light-900 border border-dashed"></div>
          <div className="relative flex items-start">
            <span className="h-9 flex items-center">
              <span className="relative z-10 w-8 h-8 flex items-center justify-center border-2 border-light-900 rounded-full">
                <span className="text-light-900">3</span>
              </span>
            </span>
            <span className="ml-4 min-w-0 mt-1.5">
              <span className="text-md text-light-900 tracking-wide">
                Información de contacto
              </span>
            </span>
          </div>
        </a>
      </Link>

      <Link href="">
        <a className="block relative">
          <div className="relative flex items-start">
            <span className="h-9 flex items-center">
              <span className="relative z-10 w-8 h-8 flex items-center justify-center border-2 border-light-900 rounded-full">
                <span className="text-light-900">4</span>
              </span>
            </span>
            <span className="ml-4 min-w-0 mt-1.5">
              <span className="text-md text-light-900 tracking-wide">
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
