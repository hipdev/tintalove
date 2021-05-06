import Link from 'next/link'

import { MdFilterList } from 'react-icons/md'
import { FaRegCommentDots } from 'react-icons/fa'
import { RiHeartLine } from 'react-icons/ri'
import Masonry from 'react-masonry-css'

const ArtistList = ({ posts }) => {
  console.log(posts, 'los posts')

  const breakpointColumnsObj = {
    default: 6,
    1600: 4,
    1100: 3,
    700: 2,
    500: 1,
  }

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

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link href={`/${post.username}`} key={post.username}>
              <a>
                <img
                  // src="https://via.placeholder.com/309x234"
                  src={
                    post?.image?.url
                      ? `${post.image.url}/tr:pr-true,c-at_max,f-auto,h-235,q-100`
                      : 'https://via.placeholder.com/309x234'
                  }
                  alt=""
                  className="w-full rounded-sm mb-1 object-cover"
                />
                <div className="flex justify-between mt-2">
                  <div className="flex items-center space-x-2">
                    <img
                      src={`${post.artist_picture}/tr:pr-true,c-at_max,f-auto,h-32,q-100`}
                      className="w-7 h-7 bg-primary rounded-full"
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
      </Masonry>
    </div>
  )
}

export default ArtistList
