import Link from 'next/link'
import { useRouter } from 'next/router'
import { CgWorkAlt } from 'react-icons/cg'
import { FaRegUserCircle } from 'react-icons/fa'
import { FiPhoneCall } from 'react-icons/fi'
import { HiCamera } from 'react-icons/hi'

type Props = {
  uid?: string
  username: string
}

const SideMenuStudio = ({ uid, username }: Props) => {
  const router = useRouter()
  const [path] = router.route.split('/').slice(-1) // get last item from pathName

  return (
    <div className="mb-10 lg:mb-0">
      <div className="mb-10 mt-12">
        <p className="text-primary text-xl font-semibold">Estar en TintaLove</p>
        <h1 className="text-2xl text-white font-bold tracking-wide">
          Es mostrarte al mundo
        </h1>
      </div>

      {username && (
        <Link href={`/st/${username}`}>
          <a className="mb-10 inline-flex items-center text-white bg-primary px-4 py-2 rounded-sm py">
            Ver perfil
            <FaRegUserCircle className="text-xl ml-4" />
          </a>
        </Link>
      )}

      <div className="text-light-900 pr-7">
        <Link href="/studio-account/general">
          <a className={path == 'main-info' ? 'text-white' : ''}>
            <div className="pb-10 flex items-center justify-between">
              Información general
              <FaRegUserCircle className="text-xl" />
            </div>
          </a>
        </Link>

        <Link href="/studio-account/artists">
          <a className={path == 'working-info' ? 'text-white' : ''}>
            <div className="pb-10 flex items-center justify-between">
              Artistas
              <CgWorkAlt className="text-xl" />
            </div>
          </a>
        </Link>

        <Link href="/studio-account/contact-info">
          <a className={path == 'contact-info' ? 'text-white' : ''}>
            <div className="pb-10 flex items-center justify-between">
              Información de Contacto
              <FiPhoneCall className="text-xl" />
            </div>
          </a>
        </Link>

        <Link href="/studio-account/pictures-info">
          <a className={path == 'pictures-info' ? 'text-white' : ''}>
            <div className="pb-10 flex items-center justify-between">
              Fotos del estudio
              <HiCamera className="text-xl" />
            </div>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default SideMenuStudio
