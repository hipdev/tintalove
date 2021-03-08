import Link from "next/link";

const ProfileMenu = () =>{
  return(
    <div className="absolute top-11 right-10 w-40 h-64 flex flex-col bg-light-500 rounded-lg p-5 z-10">
              <Link href="#">
                <a className="py-1 transition duration-500 ease-out hover:text-red-500 transform hover:-translate-y-1 hover:scale-110">Mi perfil</a>
              </Link>
              <Link href="#">
                <a className="py-1 transition duration-500 ease-out hover:text-red-500 transform hover:-translate-y-1 hover:scale-110">Editar perfil</a>
              </Link>
              <Link href="#">
                <a className="py-1 transition duration-500 ease-out hover:text-red-500 transform hover:-translate-y-1 hover:scale-110">Favoritos</a>
              </Link>
              <Link href="#">
                <a className="py-1 transition duration-500 ease-out hover:text-red-500 transform hover:-translate-y-1 hover:scale-110">Mis colecciones</a>
              </Link>
              <div className="w-full h-px border border-light-900 my-3"></div>
              <Link href="#">
                <a className="py-1 transition duration-500 ease-out hover:text-red-500 transform hover:-translate-y-1 hover:scale-110">Configuraciones</a>
              </Link>
              <Link href="#">
                <a className="py-1 transition duration-500 ease-out hover:text-red-500 transform hover:-translate-y-1 hover:scale-110">Salir</a>
              </Link>
            </div>
  )
}

export default ProfileMenu;