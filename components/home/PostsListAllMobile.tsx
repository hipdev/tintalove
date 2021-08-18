import Loading from 'components/loading/loading'
import useAllPostsMobile from 'hooks/useAllPostsMobile'
import Image from 'next/image'
import InfiniteScroll from 'react-infinite-scroll-component'
import PostItem from './PostItem'

const PostsListAllMobile = ({ user, latLng }) => {
  const { posts, isLoadingInitialData, hasReachedEnd, size, setSize } = latLng
    ? useAllPostsMobile()
    : useAllPostsMobile()

  return (
    <div className="px-5 sm:px-10 lg:px-20 pt-7 md:pt-24 pb-14">
      <InfiniteScroll
        dataLength={posts.length}
        next={() => {
          // console.log('next')
          setSize(size + 1)
        }}
        hasMore={!hasReachedEnd}
        loader={!isLoadingInitialData ? <Loading /> : null}
        endMessage={
          <div className="h-auto  text-center mb-20 px-2">
            <Image
              src="/end.png"
              width={100}
              height={100}
              alt="Fin de la página"
            />
          </div>
        }
      >
        {posts?.map((post: any) => (
          <div key={post.id}>
            <PostItem key={post.id} post={post} user={user} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default PostsListAllMobile
