import { Toaster } from 'react-hot-toast'
import { FaRegUserCircle } from 'react-icons/fa'

const PicturesInfo = ({ uid, isArtist }) => {
  return (
    <div className="w-4/5 mt-10">
      <Toaster
        toastOptions={{
          className: 'bg-red-600',
          style: {
            background: '#ef3e30',
            border: 'none',
            borderRadius: '3px',
            color: '#fff',
          },
          duration: 5000,
        }}
        position="bottom-right"
      />
      <h1 className="text-xl sm:text-2xl font-bold  sm:text-left tracking-wide mb-2">
        Fotos de perfil
      </h1>

      <form className="mt-10">
        <div className="flex justify-center">
          <div className="w-96 h-72 flex flex-col justify-center items-center border-4 border-dashed border-gray-200 rounded-xl mb-5 sm:mb-0">
            <span className="text-4xl text-light-900 mb-4">
              <FaRegUserCircle />
            </span>
            <p className="text-sm sm:text-base text-white text-center mb-4">
              JPG, GIF or PNG. Max size of 800K
            </p>
            <div className="relative bg-light-900 px-4 py-3 rounded-lg">
              <p className="text-white tracking-wide">Seleccionar Archivo</p>
              <input
                type="file"
                className="absolute top-0 right-0 bottom-0 left-0 w-full h-full opacity-0"
              />
            </div>
          </div>
        </div>
        <button className="block absolute right-10 -bottom-5 btn-red py-3 px-5">
          Finalizar
        </button>
      </form>
    </div>
  )
}

export default PicturesInfo
