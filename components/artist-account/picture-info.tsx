import { FaRegUserCircle } from 'react-icons/fa'

import SideMenu from './side-menu'

const PictureInfo = () => {
  return (
    <div className="w-full h-auto lg:h-screen bg-gradient-to-r from-dark-700   to-black">
      <div className="h-full flex flex-col">
        <div className="h-full flex flex-col lg:flex-row justify-evenly items-center">
          <SideMenu />
          <div className="relative w-10/12 sm:w-2/3 h-auto bg-dark-700 bg-opacity-50 rounded-xl p-6 sm:p-12 mb-10 lg:mb-0">
            <div>
              <h1 className="text-white text-xl sm:text-2xl font-bold text-center sm:text-left tracking-wide mb-10">
                Foto De Perfil
              </h1>
              <form action="">
                <div className="flex justify-center">
                  <div className="w-96 h-72 flex flex-col justify-center items-center border-4 border-dashed border-gray-200 rounded-xl mb-5 sm:mb-0">
                    <span className="text-4xl text-light-900 mb-4">
                      <FaRegUserCircle />
                    </span>
                    <p className="text-sm sm:text-base text-white text-center mb-4">
                      JPG, GIF or PNG. Max size of 800K
                    </p>
                    <div className="relative bg-light-900 px-4 py-3 rounded-lg">
                      <p className="text-white tracking-wide">
                        Seleccionar Archivo
                      </p>
                      <input
                        type="file"
                        className="absolute top-0 right-0 bottom-0 left-0 w-full h-full opacity-0"
                      />
                    </div>
                  </div>
                </div>
              </form>
              <button className="block absolute right-10 -bottom-5 btn-red py-3 px-5">
                Finalizar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PictureInfo
