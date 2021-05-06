import Link from 'next/link'

import { MdFilterList } from 'react-icons/md'
import { FaRegCommentDots } from 'react-icons/fa'
import { RiHeartLine } from 'react-icons/ri'

const ArtistList = ({ posts }) => {
  console.log(posts, 'los posts')
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
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 relative">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link href={`/${post.username}`} key={post.username}>
              <a className="aspect-w-6 aspect-h-7 ">
                <img
                  // src="https://via.placeholder.com/309x234"
                  src={
                    post?.image?.url
                      ? `${post.image.url}/tr:pr-true,c-at_max,f-auto,h-235,q-100`
                      : 'https://via.placeholder.com/309x234'
                  }
                  alt=""
                  className="w-full rounded-md mb-1 object-cover"
                />
                <div className=" w-full flex">
                  <div className="flex items-center space-x-2">
                    <img
                      src={`${post.artist_picture}/tr:pr-true,c-at_max,f-auto,h-32,q-100`}
                      className="w-8 h-8 bg-primary rounded-full"
                    />
                    <p className="text-white text-sm">
                      {post.displayName || 'Sin nombre'}
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
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
      </div>
    </div>
  )
}

export default ArtistList
