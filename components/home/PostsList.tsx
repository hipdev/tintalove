import useUserId from 'hooks/use-user-id'
import { getUserInfo } from 'lib/queries/users'
import { MdFilterList } from 'react-icons/md'
import Masonry from 'react-masonry-css'
import useSWR from 'swr'
import PostItem from './PostItem'

const PostListHome = ({ posts }) => {
  const { userId } = useUserId()
  const { data } = useSWR(userId ? userId : null, getUserInfo)

  const breakpointColumnsObj = {
    default: 6,
    1600: 4,
    1100: 3,
    700: 2,
    500: 1,
  }

  return (
    <div className="px-5 sm:px-10 lg:px-20 pt-24">
      <div className="flex flex-wrap justify-center sm:justify-between mb-6">
        <div className="flex items-center space-x-2 mb-3 sm:mb-0 mr-3">
          <button className="text-white mr-4 border-b border-primary pb-2">
            POPULAR
          </button>
          <button className="text-white pb-2">MÁS RECIENTE</button>
        </div>
      </div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {/* <div className="grid grid-cols-6 gap-6"> */}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={Math.random()}
              post={post}
              user={data?.user || null}
            />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={Math.random()}
              post={post}
              user={data?.user || null}
            />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={Math.random()}
              post={post}
              user={data?.user || null}
            />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={Math.random()}
              post={post}
              user={data?.user || null}
            />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={Math.random()}
              post={post}
              user={data?.user || null}
            />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={Math.random()}
              post={post}
              user={data?.user || null}
            />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={Math.random()}
              post={post}
              user={data?.user || null}
            />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={Math.random()}
              post={post}
              user={data?.user || null}
            />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={Math.random()}
              post={post}
              user={data?.user || null}
            />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={Math.random()}
              post={post}
              user={data?.user || null}
            />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={Math.random()}
              post={post}
              user={data?.user || null}
            />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={Math.random()}
              post={post}
              user={data?.user || null}
            />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={Math.random()}
              post={post}
              user={data?.user || null}
            />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={Math.random()}
              post={post}
              user={data?.user || null}
            />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={Math.random()}
              post={post}
              user={data?.user || null}
            />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={Math.random()}
              post={post}
              user={data?.user || null}
            />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={Math.random()}
              post={post}
              user={data?.user || null}
            />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={Math.random()}
              post={post}
              user={data?.user || null}
            />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={Math.random()}
              post={post}
              user={data?.user || null}
            />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={Math.random()}
              post={post}
              user={data?.user || null}
            />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={Math.random()}
              post={post}
              user={data?.user || null}
            />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={Math.random()}
              post={post}
              user={data?.user || null}
            />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={Math.random()}
              post={post}
              user={data?.user || null}
            />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={Math.random()}
              post={post}
              user={data?.user || null}
            />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem
              key={Math.random()}
              post={post}
              user={data?.user || null}
            />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">Sin publicaciones</p>
        )}
      </Masonry>
    </div>
  )
}

export default PostListHome
