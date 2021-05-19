import { CgClose } from 'react-icons/cg'
import { FiBookmark, FiInstagram } from 'react-icons/fi'
import { AiFillFacebook } from 'react-icons/ai'
import { FaTwitter } from 'react-icons/fa'
import { RiCalendarLine, RiMessengerLine } from 'react-icons/ri'
import { RiRoadMapLine } from 'react-icons/ri'
import { FiClock } from 'react-icons/fi'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { FaRegCommentDots } from 'react-icons/fa'
import { RiHeartLine } from 'react-icons/ri'
import { FiSend } from 'react-icons/fi'
import Link from 'next/link'
import PostsComments from './post-comments'
import StickyBox from 'react-sticky-box'
import { PostTypes } from 'types/post'
import { ArtistTypes } from 'types/artist'
import { Toaster } from 'react-hot-toast'
import useUser from 'hooks/use-user'
import { useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'

const PostStatic = ({
  postData,
  artistData,
  commentsData,
}: {
  postData: PostTypes
  artistData: ArtistTypes
  commentsData: any
}) => {
  console.log(postData, 'la data del post')
  console.log(artistData, 'la data del artista')
  console.log(commentsData, 'Los comentarios del post')

  const { state } = useUser()

  const [totalComments, setTotalComments] = useState(
    postData.counter_comments || 0
  )

  const PictureSize = () =>{
    if(postData.pictureSize !=== postData.pictureSize){
      console.log('Img ')
    }
  }

  console.log(state, 'el user')
  return (
    <div className="w-full container mx-auto">
      <Toaster
        toastOptions={{
          className: 'bg-red-600',
          style: {
            background: '#ef3e30',
            border: 'none',
            borderRadius: '3px',
            color: '#fff',
          },
          duration: 2000,
        }}
        position="bottom-right"
      />

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

          <div className="mb-5 flex justify-center">
            <img
              // src="https://via.placeholder.com/1100x621"
              src={
                postData?.image?.url
                  ? `${postData.image.url}/tr:pr-true,c-at_max,f-auto,q-100`
                  : 'https://via.placeholder.com/1100x621'
              }
              alt=""
              className=" object-cover rounded-lg w-672"
            />
            <div className="">
              <StickyBox offsetTop={0} offsetBottom={30}>
                <aside className="z-10 ml-4">
                  <button className="block mb-2">
                    <div className="flex flex-col justify-center items-center w-14 h-14 bg-ocean_blue-300 rounded-lg">
                      <span className="text-2xl text-green-500">
                        <FiBookmark />
                      </span>
                    </div>
                    <p className="text-atomico text-white tracking-wide">
                      GUARDAR
                    </p>
                  </button>
                  <button className="block mb-2">
                    <div className="flex flex-col justify-center items-center w-14 h-14 bg-ocean_blue-300 rounded-lg">
                      <span className="text-2xl text-green-500">
                        <RiHeartLine />
                      </span>
                      <p className="text-xs text-white font-raleway">74</p>
                    </div>
                    <p className="text-atomico text-white tracking-wide">
                      ME GUSTA
                    </p>
                  </button>
                  <button className="block mb-2">
                    <div className="flex flex-col justify-center items-center w-14 h-14 bg-ocean_blue-300 rounded-lg">
                      <span className="text-2xl text-green-500">
                        <FaRegCommentDots />
                      </span>
                      <p className="text-xs text-white font-raleway">
                        {totalComments}
                      </p>
                    </div>
                    <p className="text-atomico text-white tracking-wide">
                      COMENTAR
                    </p>
                  </button>
                  <button className="block mb-2">
                    <div className="flex flex-col justify-center items-center w-14 h-14 bg-ocean_blue-300 rounded-lg">
                      <span className="text-2xl text-green-500">
                        <FiSend />
                      </span>
                    </div>
                    <p className="text-atomico text-white tracking-wide">
                      COMPARTIR
                    </p>
                  </button>
                </aside>
              </StickyBox>
            </div>
          </div>
          <div className="w-full flex flex-col-reverse mb-10">
            <PostsComments
              postId={postData.id}
              userData={state?.user}
              commentsData={commentsData}
              setTotalComments={setTotalComments}
              totalComments={totalComments}
            />
          </div>
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
