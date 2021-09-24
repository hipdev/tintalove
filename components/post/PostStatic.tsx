import Masonry from 'react-masonry-css'
import Link from 'next/link'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { PostTypes } from 'types/post'
import PostPortrait from './PostPortrait'
import PostMore from './PostMore'
import PostBottomFixed from './PostBottomFixed'
import PostRelated from './PostRelated'
import { useUser } from 'hooks/useUser'
import { ArtistTypes } from 'types/artist'

const PostStatic = ({
  artistData,
  postData,
  commentsData,
  morePostsArtist,
  closeModal,
  relatedPosts,
  overlayRef,
  showUp,
}: {
  postData: PostTypes
  artistData: ArtistTypes
  commentsData: any
  morePostsArtist: any
  closeModal: any
  relatedPosts: any
  overlayRef: any
  showUp: boolean
}) => {
  const { user }: any = useUser()

  const breakpointColumnsObj = {
    default: 6,
    1600: 4,
    1100: 3,
    700: 2,
    500: 1,
  }

  return (
    <div className="w-full xl:container mx-auto mt-3 md:mt-10 mb-20">
      <PostBottomFixed
        overlayRef={overlayRef}
        user={user}
        showUp={showUp}
        artistData={artistData}
      />
      {/* Picture, comments and card block */}

      <PostPortrait
        artistData={artistData}
        user={user}
        postData={postData}
        commentsData={commentsData}
        closeModal={closeModal}
      />

      <div className="border-t-2 border-b-2 border-light-800 py-5">
        <div className="flex flex-wrap justify-between sm:justify-between mb-5">
          <h1 className="text-white text-xl font-semibold font-raleway tracking-wide">
            Más de {artistData?.name}
          </h1>
          <Link href={`/${postData.username}`}>
            <a className="flex items-center text-white font-raleway tracking-wide">
              Visitar perfil
              <span className="text-green-600 text-2xl pl-2">
                <HiArrowNarrowRight />
              </span>
            </a>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 ">
          {morePostsArtist &&
            morePostsArtist.map((post) => (
              <PostRelated post={post} user={user} key={post.id} />
            ))}
        </div>
      </div>
      <div className="py-5">
        <div className="flex flex-wrap justify-center sm:justify-between mb-5">
          <h1 className="text-white text-xl font-semibold font-raleway tracking-wide">
            También podría interesarte
          </h1>
          <button className="flex items-center text-white font-raleway tracking-wide">
            Ver más
            <span className="text-green-600 text-2xl pl-2">
              <HiArrowNarrowRight />
            </span>
          </button>
        </div>
        <div className="">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {relatedPosts &&
              relatedPosts.map((post) => (
                <PostMore post={post} user={user} key={post.id} />
              ))}
            {relatedPosts &&
              relatedPosts.map((post) => (
                <PostMore post={post} user={user} key={post.id} />
              ))}
            {relatedPosts &&
              relatedPosts.map((post) => (
                <PostMore post={post} user={user} key={post.id} />
              ))}
          </Masonry>
        </div>
      </div>
    </div>
  )
}

export default PostStatic
