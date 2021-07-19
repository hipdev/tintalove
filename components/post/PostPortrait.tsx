import StickyBox from 'react-sticky-box'
import Image from 'next/image'
import { BsArrowLeft } from 'react-icons/bs'

import PostsComments from './PostComments'
import { PostTypes } from 'types/post'
import { ArtistTypes } from 'types/artist'
import { useState } from 'react'
import PostAside from './PostAside'
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
        <div className="mb-5 flex justify-center xl:justify-start ">
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

      <div className="flex flex-grow flex-col self-start w-full md:w-2/5 ml-0 xl:ml-10 ">
        <div className="flex mb-8 border-gray-700 border-b pb-5">
          <button
            className="flex items-center gap-3 text-white focus:outline-none mr-10"
            onClick={closeModal}
          >
            <span className="text-2xl rounded-full bg-gr-700 p-3 border border-gr-600">
              <BsArrowLeft />
            </span>
          </button>
          <div className="flex flex-col mb-2">
            <h1 className="text-white text-2xl font-semibold tracking-wide">
              {postData.description || 'Sin descripción'}
            </h1>
            <p className="text-light-200 text-sm self-end">
              #Realismo #Color #Payaso #Retrato
            </p>
          </div>
        </div>

        <div className="flex justify-center xl:justify-start h-[50rem]">
          <div className="mr-3 hidden sm:block ">
            <StickyBox offsetTop={10} offsetBottom={20}>
              <div>
                <button
                  className="flex items-center gap-3 text-white focus:outline-none mr-10 mb-4"
                  // onClick={closeModal}
                >
                  <span className="text-2xl rounded-full bg-gr-700 p-3 border border-gr-600">
                    <BsArrowLeft />
                  </span>
                </button>

                <button
                  className="flex items-center gap-3 text-white focus:outline-none mr-10 mb-4"
                  // onClick={closeModal}
                >
                  <span className="text-2xl rounded-full bg-gr-700 p-3 border border-gr-600">
                    <BsArrowLeft />
                  </span>
                </button>

                <button
                  className="flex items-center gap-3 text-white focus:outline-none mr-10"
                  // onClick={closeModal}
                >
                  <span className="text-2xl rounded-full bg-gr-700 p-3 border border-gr-600">
                    <BsArrowLeft />
                  </span>
                </button>
              </div>
            </StickyBox>
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
    </div>
  )
}

export default PostPortrait
