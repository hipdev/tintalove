import Link from 'next/link'

import { MdFilterList } from 'react-icons/md'
import { FaRegCommentDots } from 'react-icons/fa'
import { RiHeartLine } from 'react-icons/ri'

const ArtistList = ({ artists }) => {
  console.log(artists, 'los artistas')
  return (
    <div className="px-5 sm:px-10 lg:px-20 pt-10">
      <div className="flex flex-wrap justify-center sm:justify-between mb-6">
        <div className="flex items-center space-x-2 mb-3 sm:mb-0 mr-3">
          <button className="text-white mr-4 border-b border-primary pb-2">
            POPULAR
          </button>
          <button className="text-white pb-2">MÁS RECIENTE</button>
        </div>
        <div className="flex space-x-5">
          <button className="flex items-center text-white border border-gray-100 px-5 py-3 rounded-lg focus:outline-none">
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
                  className="w-full rounded-md mb-1 h-52"
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-full"></div>
                    <p className="text-white text-sm">
                      {artist.displayName || 'Sin nombre'}
                    </p>
                  </div>
                  <div className="flex space-x-5">
                    <div className="flex items-center space-x-2 text-white">
                      <p className="">10</p>
                      <span>
                        <FaRegCommentDots />
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-white">
                      <p className="">53</p>
                      <span>
                        <RiHeartLine />
                      </span>
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
