import { AiOutlineStar } from 'react-icons/ai'
import { FaInstagram } from 'react-icons/fa'
import { AiFillFacebook } from 'react-icons/ai'
import { AiOutlineTwitter } from 'react-icons/ai'
import { AiOutlineCalendar } from 'react-icons/ai'

import { ArtistTypes } from 'types/artist'

const ArtistCard = ({ artist }: { artist: ArtistTypes }) => {
  return (
    <div className="w-full h-full bg-ocean_blue-800 p-5 rounded-md">
      <div className="flex justify-between mb-8">
        <div className="flex flex-wrap gap-5">
          <div className="bg-black w-14  h-14  rounded-xl">
            <img src="" alt="" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-wide">
              {artist.displayName}
            </h1>
            <p className="text-white">
              {artist.city_name} {artist.province}
            </p>
          </div>
        </div>
        <div className="w-14 h-14 bg-light-600 rounded-full flex flex-shrink-0 items-center justify-center">
          <span className="text-white text-2xl">
            <AiOutlineStar />
          </span>
        </div>
      </div>
      <div className="flex gap-4 mb-5 justify-between">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-green-500 text-xl">
            <AiOutlineCalendar />
          </span>
          <p className="text-white">Disponible en 2 meses</p>
        </div>
        <div className="flex gap-4">
          <span className="text-2xl text-white">
            <FaInstagram />
          </span>
          <span className="text-2xl text-white">
            <AiFillFacebook />
          </span>
          <span className="text-2xl text-white">
            <AiOutlineTwitter />
          </span>
        </div>
      </div>
      <p className="text-white my-4">
        <span>Estilos: </span>
        {artist?.styles ? (
          artist.styles.toString()
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

export default ArtistCard
