import StickyBox from 'react-sticky-box'
import Image from 'next/image'
import { BsArrowLeft } from 'react-icons/bs'

import PostsComments from './PostComments'
import { PostTypes } from 'types/post'
import { ArtistTypes } from 'types/artist'
import { useState } from 'react'
import PostAside from './create/PostAside'
import { UserState } from 'types/user'
import Link from 'next/link'
import { FiPhoneCall } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'

const loaderPost = ({ src, quality }: any) => {
  return `${src}/tr:pr-true,c-at_max,f-auto,q-${quality || 75}`
}

const PostPortrait = ({
  closeModal,
  user,
  postData,
  artistData,
  commentsData,
}: {
  postData: PostTypes
  artistData: ArtistTypes
  commentsData: any
  user: UserState
  closeModal: any
}) => {
  const [totalComments, setTotalComments] = useState(
    postData.counter_comments || 0
  )

  console.log(artistData, 'data Artist')

  return (
    <div className="flex flex-col md:flex-row items-center xl:justify-between">
      <div className="w-full sm:w-3/5 md:w-3/5">
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
        <div className="mb-5 flex justify-center xl:justify-start ">
          <div className="mr-3 hidden sm:block">
            <StickyBox offsetTop={10} offsetBottom={20}>
              <PostAside postData={postData} />
            </StickyBox>
          </div>
          {/* <img
          // src="https://via.placeholder.com/1100x621"
          src={
            postData?.image?.url
              ? `${postData.image.url}/tr:pr-true,c-at_max,f-auto,q-100`
              : 'https://via.placeholder.com/1100x621'
          }
          alt=""
          className=" object-cover rounded-lg  md:max-w-lg lg:max-w-2xl"
        /> */}
          <div className="aspect-w-3 aspect-h-4 relative w-full h-448">
            <Image
              loader={loaderPost}
              src={postData?.image?.url}
              alt="Artist photo"
              layout="fill"
              // width={600}
              // height={500}
              sizes="100%"
              quality={100}
              className="w-full rounded-md  object-cover max-h-96"
            />
          </div>

          {/* <img
          alt=" "
          className=""
          loading="lazy"
          src="https://i.pinimg.com/236x/fb/d6/ce/fbd6ce4c83fd8d13dcdac1a9b72595b0.jpg"
          srcset="https://i.pinimg.com/236x/fb/d6/ce/fbd6ce4c83fd8d13dcdac1a9b72595b0.jpg 1x, https://i.pinimg.com/474x/fb/d6/ce/fbd6ce4c83fd8d13dcdac1a9b72595b0.jpg 2x, https://i.pinimg.com/736x/fb/d6/ce/fbd6ce4c83fd8d13dcdac1a9b72595b0.jpg 3x, https://i.pinimg.com/originals/fb/d6/ce/fbd6ce4c83fd8d13dcdac1a9b72595b0.jpg 4x"
        /> */}
        </div>
      </div>

      <div className="flex flex-grow flex-col self-start w-full md:w-2/5 ml-0 xl:ml-20 overflow-hidden overflow-ellipsis pl-10">
        <div className="bg-dark-800 text-gray-200 px-4 py-4 mb-10 rounded-sm">
          <div className="flex justify-between">
            <div className="flex">
              <Link href={`/${artistData.username}`}>
                <a>
                  <img
                    src={artistData?.profile_picture.url}
                    className="w-12 h-12 rounded-full"
                  />
                </a>
              </Link>
              <div className="flex flex-col ml-5">
                <Link href={`/${artistData.username}`}>
                  <a className="text-xl">{artistData.displayName}</a>
                </Link>
                <span className="text-sm text-gray-400">{`${artistData.city_name}, ${artistData.province}`}</span>
              </div>
            </div>
            <div className="flex items-start">
              <button className="bg-rd-400 hover:bg-rd-300 text-2xl p-2 rounded-full mr-2">
                <AiOutlineHeart />
              </button>
              <a
                href={`tel:${artistData.phone}`}
                className="bg-gn-400 hover:bg-gn-300 text-2xl p-2 rounded-full inline-block"
              >
                <FiPhoneCall />
              </a>
            </div>
          </div>
          <div className="h-[2px] w-full bg-gray-800 mt-2"></div>
          <h3 className="mt-2 text-lg text-gray-400 font-semibold">
            Agenda:{' '}
            <span className="font-normal text-gray-200">
              {artistData.available_label}
            </span>{' '}
          </h3>
        </div>

        <PostsComments
          postId={postData.id}
          user={user || null}
          commentsData={commentsData}
          setTotalComments={setTotalComments}
          totalComments={totalComments}
        />
      </div>
    </div>
  )
}

export default PostPortrait
