import { CgClose } from 'react-icons/cg'
import { FiInstagram } from 'react-icons/fi'
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
import useUser from 'hooks/use-user'
import { useState } from 'react'

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

  return (
    <div className="w-full container mx-auto">
      {/* Picture, comments and card block */}
      <div className="flex lg:container-xs mx-20 ">
        <div className="w-1/6">
          <StickyBox offsetTop={0} offsetBottom={30}>
            <aside className="z-10">
              <Link href="#">
                <a>
                  <img
                    // src="https://via.placeholder.com/45x45"
                    src={
                      artistData?.profile_picture?.url
                        ? `${artistData.profile_picture.url}/tr:pr-true,c-at_max,f-auto,q-100,w-80`
                        : 'https://via.placeholder.com/1100x621'
                    }
                    className="object-cover h-16 rounded-sm mb-5 overflow-hidden"
                  />
                </a>
              </Link>

              <button className="block mb-2">
                <div className="flex flex-col justify-center items-center w-14 h-14 bg-light-900 rounded-lg">
                  <span className="text-2xl text-white">
                    <RiHeartLine />
                  </span>
                  <p className="text-xs text-white font-raleway">74</p>
                </div>
                <p className="text-atomico text-white tracking-wide">
                  ME GUSTA
                </p>
              </button>
              <button className="block mb-2">
                <div className="flex flex-col justify-center items-center w-14 h-14 bg-light-900 rounded-lg">
                  <span className="text-2xl text-white">
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
                <div className="flex flex-col justify-center items-center w-14 h-14 bg-light-900 rounded-lg">
                  <span className="text-2xl text-white">
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
        <div className="w-5/6">
          <div className="flex flex-wrap justify-center lg:justify-between mb-8">
            <div className="flex flex-wrap justify-center space-x-5 mb-4 lg:mb-0 mt-8 sm:mt-0 mr-0 md:mr-1 items-center">
              <div className="mb-3 sm:mb-0">
                <h1 className="text-white text-2xl sm:text-xl font-semibold font-raleway tracking-wide">
                  {artistData.displayName || 'Sin nombre'}
                </h1>
                <h6 className="text-light-200 text-sm">
                  {artistData.city_name || 'Sin ciudad'},{' '}
                  {artistData.province || 'Sin departamento'}
                </h6>
              </div>
              <button className="flex items-center gap-3 btn-primary px-3 py-2 tracking-wide mb-3 sm:mb-0 ">
                <span className="text-xl">
                  <RiMessengerLine />
                </span>
                CONTÁCTAME
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col mb-2">
                <h1 className="text-white text-2xl font-semibold font-raleway tracking-wide">
                  {postData.description || 'Sin descripción'}
                </h1>
                <p className="text-light-200 text-sm self-end">
                  #Realismo #Color #Payaso #Retrato
                </p>
              </div>
              <span className="text-4xl text-white">
                <CgClose />
              </span>
            </div>
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
              className=" object-cover rounded-lg max-h-[55rem]"
            />
          </div>
          <div className="flex flex-col-reverse lg:flex-row justify-between mb-10">
            <PostsComments
              postId={postData.id}
              userData={state?.user}
              commentsData={commentsData}
              setTotalComments={setTotalComments}
              totalComments={totalComments}
            />

            <div className="flex-shrink-0 self-center lg:self-start rounded-lg overflow-hidden mb-5 lg:mb-0  bg-ocean_blue-200 w-1/3">
              <div className=" h-auto  px-10 xl:px-13 pt-10 pb-8 ">
                <div className="flex space-x-3">
                  <img
                    src={
                      artistData?.profile_picture?.url
                        ? `${artistData.profile_picture.url}/tr:pr-true,c-at_max,f-auto,q-100,w-38`
                        : 'https://via.placeholder.com/1100x621'
                    }
                    // src="https://via.placeholder.com/45x45"
                    alt=""
                    className="rounded-md"
                  />

                  <div>
                    <h1 className="text-white text-xl font-semibold font-raleway tracking-wide">
                      {artistData.displayName}
                    </h1>
                    <h6 className="text-light-200 text-xs">
                      {artistData.city_name}, {artistData.province}
                    </h6>
                  </div>
                </div>
                <div className="flex space-x-4 my-4">
                  <Link href="#">
                    <a>
                      <span className="text-2xl text-light-200">
                        <FiInstagram />
                      </span>
                    </a>
                  </Link>
                  <Link href="#">
                    <a>
                      <span className="text-2xl text-light-200">
                        <AiFillFacebook />
                      </span>
                    </a>
                  </Link>
                  <Link href="#">
                    <a>
                      <span className="text-2xl text-light-200">
                        <FaTwitter />
                      </span>
                    </a>
                  </Link>
                </div>
                <div>
                  <div className="flex space-x-2">
                    <span className="text-light-500">
                      <RiCalendarLine />
                    </span>
                    <p className="text-light-500 text-xs">
                      Disponible en 2 meses
                    </p>
                  </div>
                  <div className="flex space-x-2 my-2">
                    <span className="text-light-500">
                      <RiRoadMapLine />
                    </span>
                    <p className="text-light-500 text-xs">Cómo llegar</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className="text-light-500">
                      <FiClock />
                    </span>
                    <p className="text-light-500 text-xs mb-5">
                      {artistData.times}
                    </p>
                  </div>
                </div>
                <button className="btn-primary py-3 font-light tracking-wide w-full focus:outline-none">
                  Contáctame
                </button>
              </div>
            </div>
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
