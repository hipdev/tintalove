import Link from 'next/link'

import { TiLocationOutline } from 'react-icons/ti'
import { MdFilterList } from 'react-icons/md'
import { FaRegCommentDots } from 'react-icons/fa'
import { RiHeartLine } from 'react-icons/ri'

const ArtistList = ({ artists }) => {
  console.log(artists, 'los artistas')
  return (
    <div className="px-5 sm:px-10 lg:px-20">
      <div className="flex flex-wrap justify-center sm:justify-between mb-6">
        <div className="flex items-center space-x-2 mb-3 sm:mb-0 mr-3">
          <span className="text-red-600 text-3xl">
            <TiLocationOutline />
          </span>
          <Link href="/">
            <a className="text-white font-raleway underline">
              Medellín, Antioquia
            </a>
          </Link>
        </div>
        <div className="flex space-x-5">
          <select className="text-white font-raleway border border-light-700 p-3 rounded-lg bg-transparent focus:outline-none">
            <option value="">Popular</option>
          </select>
          <button className="flex items-center text-white font-raleway border border-light-700 px-5 py-3 rounded-lg focus:outline-none">
            <span className="mr-2 text-xl">
              <MdFilterList />
            </span>
            Filtros
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-8">
        {artists ? (
          artists.map((artist) => (
            <Link href={`/${artist.username}`} key={artist.username}>
              <a>
                <img
                  // src="https://via.placeholder.com/309x234"
                  src={
                    artist?.profile_picture?.url
                      ? `${artist.profile_picture.url}/tr:pr-true,c-at_max,f-auto,h-235,q-100`
                      : 'https://via.placeholder.com/309x234'
                  }
                  alt=""
                  className="w-full rounded-lg mb-1 h-72"
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-full"></div>
                    <p className="text-white text-sm font-raleway">
                      {artist.displayName || 'Sin nombre'}
                    </p>
                  </div>
                  <div className="flex space-x-5">
                    <div className="flex items-center space-x-2 text-white">
                      <span>
                        <FaRegCommentDots />
                      </span>
                      <p className="font-raleway">10</p>
                    </div>
                    <div className="flex items-center space-x-2 text-white">
                      <span>
                        <RiHeartLine />
                      </span>
                      <p className="font-raleway">53</p>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          ))
        ) : (
          <p>sin artistas registrados</p>
        )}
      </div>
    </div>
  )
}

export default ArtistList
