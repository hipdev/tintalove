import { HiArrowNarrowRight } from 'react-icons/hi'
import StickyBox from 'react-sticky-box'
import { PostTypes } from 'types/post'
import { ArtistTypes } from 'types/artist'
import { BsArrowLeft } from 'react-icons/bs'
import PostPortrait from './PostPortrait'
import PostHorizontal from './PostHorizontal'
import Link from 'next/link'
import PostMore from './PostMore'
import useSWR from 'swr'
import useUserId from 'hooks/use-user-id'
import { getUserInfo } from 'lib/queries/users'

const PostStatic = ({
  postData,
  artistData,
  commentsData,
  morePostsArtist,
  closeModal,
  relatedPosts,
}: {
  postData: PostTypes
  artistData: ArtistTypes
  commentsData: any
  morePostsArtist: any
  closeModal: any
  relatedPosts: any
}) => {
  const { userId } = useUserId()
  const { data } = useSWR(userId ? userId : null, getUserInfo)
  return (
    <div className="w-full container mx-auto mt-3 md:mt-20">
      <div className="w-full xl:max-w-3xl flex flex-wrap justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="flex flex-col mb-2">
            <h1 className="text-white text-2xl font-semibold font-raleway tracking-wide">
              {postData.description || 'Sin descripción'}
            </h1>
            <p className="text-light-200 text-sm self-end">
              #Realismo #Color #Payaso #Retrato
            </p>
          </div>
        </div>
        <button
          className="flex items-center gap-3 text-white focus:outline-none"
          onClick={closeModal}
        >
          <span className="text-3xl">
            <BsArrowLeft />
          </span>
          Volver
        </button>
      </div>
      {/* Picture, comments and card block */}
      <div className="flex lg:container-xs">
        <div className="w-full">
          {postData.picture_size == 'portrait' ? (
            <PostPortrait
              user={data?.user}
              postData={postData}
              artistData={artistData}
              commentsData={commentsData}
            />
          ) : (
            <PostHorizontal
              user={data?.user}
              postData={postData}
              artistData={artistData}
              commentsData={commentsData}
            />
          )}
        </div>
      </div>

      <div className="w-full ">
        <div className="border-t-2 border-b-2 border-light-800 py-5">
          <div className="flex flex-wrap justify-between sm:justify-between mb-5">
            <h1 className="text-white text-xl font-semibold font-raleway tracking-wide">
              Más de {artistData.displayName}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {morePostsArtist &&
              morePostsArtist.map((post) => (
                <PostMore post={post} user={data?.user} key={post.id} />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {relatedPosts &&
              relatedPosts.map((post) => (
                <PostMore post={post} user={data?.user} key={post.id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostStatic
