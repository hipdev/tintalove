import { AiOutlineCalendar } from 'react-icons/ai'
import { StudioTypes } from 'types/studios'

const StudioCard = ({ studios }: { studios: StudioTypes }) => {
  return (
    <div className="w-full h-full bg-ocean_blue-800 p-5 rounded-md">
      <div className="flex justify-between">
        <div className="flex flex-wrap gap-5">
          <div className="bg-black w-14 sm:w-16 h-14 sm:h-16 rounded-xl">
            <img src="" alt="" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-wide">
              {studios.username}
            </h1>
            <div className="flex gap-4 justify-between">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-green-500 text-xl">
                  <AiOutlineCalendar />
                </span>
                <p className="text-green-500 text-sm">Disponible en 15 días</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-white mb-2 mt-3 truncate">
        <span>Estilos: </span>
        {studios?.styles ? (
          studios.styles.toString()
        ) : (
          <span>Ninguno registrado</span>
        )}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
          <img src="" alt="" className="h-32 w-full" />
        </div>
        <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden">
          <img src="" alt="" className="h-32 w-full" />
        </div>
        <div className="bg-gray-300 h-full w-full rounded-md overflow-hidden hidden sm:block">
          <img src="" alt="" className="h-32 w-full" />
        </div>
      </div>
    </div>
  )
}

export default StudioCard
