import { FiBookmark } from 'react-icons/fi'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { FaRegCommentDots } from 'react-icons/fa'
import { RiHeartLine } from 'react-icons/ri'
import { FiSend } from 'react-icons/fi'
import PostsComments from './post-comments'
import StickyBox from 'react-sticky-box'
import { PostTypes } from 'types/post'
import { ArtistTypes } from 'types/artist'
import useUser from 'hooks/use-user'
import { useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import PostPortrait from './post-portrait'
import PostHorizontal from './post-horizontal'

const PostStatic = ({
  postData,
  artistData,
  commentsData,
}: {
  postData: PostTypes
  artistData: ArtistTypes
  commentsData: any
}) => {
  const { state } = useUser()

  const [totalComments, setTotalComments] = useState(
    postData.counter_comments || 0
  )

  console.log(state, 'el user')
  return (
    <div className="w-full container mx-auto">
      {/* Picture, comments and card block */}
      <div className="flex lg:container-xs mx-56">
        <div className="w-full">
          <div className="flex flex-wrap justify-center lg:justify-between mb-8 px-20">
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
            <button className="flex items-center gap-3 text-white">
              <span className="text-3xl">
                <BsArrowLeft />
              </span>
              Volver
            </button>
          </div>

          {postData.picture_size == 'portrait' ? (
            <PostPortrait
              postData={postData}
              artistData={artistData}
              commentsData={commentsData}
            />
          ) : (
            <PostHorizontal
              postData={postData}
              artistData={artistData}
              commentsData={commentsData}
            />
          )}
        </div>
      </div>

      <div className="w-full ">
        <div className="border-t-2 border-b-2 border-light-800 py-5">
          <div className="flex flex-wrap justify-center sm:justify-between mb-5">
            <h1 className="text-white text-xl font-semibold font-raleway tracking-wide">
              Más de {artistData.displayName}
            </h1>
            <button className="flex items-center text-white font-raleway tracking-wide">
              Visitar perfil
              <span className="text-green-600 text-2xl pl-2">
                <HiArrowNarrowRight />
              </span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            <div>
              <img
                src="https://via.placeholder.com/309x234"
                alt=""
                className="w-full rounded-lg mb-1"
              />
            </div>
            <div>
              <img
                src="https://via.placeholder.com/309x234"
                alt=""
                className="w-full rounded-lg mb-1"
              />
            </div>
            <div>
              <img
                src="https://via.placeholder.com/309x234"
                alt=""
                className="w-full rounded-lg mb-1"
              />
            </div>
            <div>
              <img
                src="https://via.placeholder.com/309x234"
                alt=""
                className="w-full rounded-lg mb-1"
              />
            </div>
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
            <div>
              <img
                src="https://via.placeholder.com/309x234"
                alt=""
                className="w-full rounded-lg mb-1"
              />
            </div>
            <div>
              <img
                src="https://via.placeholder.com/309x234"
                alt=""
                className="w-full rounded-lg mb-1"
              />
            </div>
            <div>
              <img
                src="https://via.placeholder.com/309x234"
                alt=""
                className="w-full rounded-lg mb-1"
              />
            </div>
            <div>
              <img
                src="https://via.placeholder.com/309x234"
                alt=""
                className="w-full rounded-lg mb-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostStatic
