import StickyBox from 'react-sticky-box'
import Image from 'next/image'
import { BsArrowLeft, BsHeart } from 'react-icons/bs'
import PostsComments from './PostComments'
import { PostTypes } from 'types/post'
import { ArtistTypes } from 'types/artist'
import { useEffect, useRef, useState } from 'react'
import { UserState } from 'types/user'
import { BiShareAlt } from 'react-icons/bi'
import { FiFlag } from 'react-icons/fi'
import { useRouter } from 'next/router'
import Link from 'next/link'
import PostGetStudioLink from './PostGetStudioLink'

const loaderPost = ({ src, quality, width }: any) => {
  return `${src}/tr:pr-true,c-at_max,f-auto,w-${width},q-${quality || 75}`
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
  const imageRef = useRef(null)
  const router = useRouter()
  const [totalComments, setTotalComments] = useState(
    postData.counter_comments || 0
  )

  const [imageHeight, setImageHeight] = useState(null)

  useEffect(() => {
    console.log('image ref')
    // console.log(imageRef.current.offsetHeight, 'imageRef')
    if (imageRef.current) {
      // esto es para calcular el alto de la foto
      setImageHeight(imageRef.current.offsetHeight)
    }
  }, [imageRef, router])

  console.log(artistData, 'data Artist')
  console.log(postData, 'data del post')

  return (
    <div className="flex flex-col md:flex-row  xl:justify-between 2xl:justify-center">
      <div
        className={
          'w-full sm:w-3/5 md:pr-10 ' +
          (postData.picture_size == 'portrait' ? '2xl:w-2/5' : 'md:pr-20 ')
        }
      >
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
          {/* <div className="aspect-w-3 aspect-h-4 relative w-full h-448"> */}
          <div
            ref={imageRef}
            className={
              'relative w-full mb-10 ' +
              (postData.picture_size == 'portrait'
                ? 'aspect-w-3 aspect-h-4 '
                : postData.picture_size == 'landscape'
                ? 'aspect-w-4 aspect-h-3'
                : 'aspect-w-1 aspect-h-1')
            }
          >
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

      <div className="flex flex-grow flex-col self-start w-full md:w-2/5 ml-0 sm:ml-4 2xl:max-w-xl">
        <div className="flex mb-8 border-gray-700 border-b pb-5">
          <button
            className="flex gap-3 text-white focus:outline-none mr-10"
            onClick={closeModal}
          >
            <span className="text-2xl rounded-full bg-gr-700 p-3 border border-gr-600">
              <BsArrowLeft />
            </span>
          </button>
          <div className="flex flex-col mb-2">
            <h1 className="text-white text-2xl font-semibold tracking-wide mb-2 leading-7">
              {postData.description || 'Sin descripción'}
            </h1>
            <p className="text-gray-400 text-sm">
              {postData.styles.join(',  ')}
            </p>
            <p className="text-sm text-gray-400">
              {postData.is_partner ? (
                postData.studio_id && (
                  <>
                    Realizado en: <PostGetStudioLink id={postData?.studio_id} />
                  </>
                )
              ) : (
                <>
                  Realizado en el estudio privado de{' '}
                  <Link href={`/${artistData.username}`}>
                    <a className="text-gn-500 font-semibold capitalize">
                      {artistData.username}
                    </a>
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex w-full">
          <div
            className="mr-3 hidden sm:block"
            style={{ height: `${imageHeight - 120}px` }} // aqui le pongo el alto de la foto - 120 px para que quede hasta acá, lo de arriba son 120px
          >
            <StickyBox offsetTop={10}>
              <div>
                <button
                  className="flex items-center gap-3 text-white focus:outline-none mr-7 mb-4"
                  // onClick={closeModal}
                >
                  <span className="text-2xl rounded-full bg-gr-700 p-3 border border-gr-600">
                    <BsHeart className="relative top-[2px]" />
                  </span>
                </button>

                <button
                  className="flex items-center gap-3 text-white focus:outline-none mr-7 mb-4"
                  // onClick={closeModal}
                >
                  <span className="text-2xl rounded-full bg-gr-700 p-3 border border-gr-600">
                    <BiShareAlt />
                  </span>
                </button>

                <button
                  className="flex items-center gap-3 text-white focus:outline-none mr-7"
                  // onClick={closeModal}
                >
                  <span className="text-2xl rounded-full bg-gr-700 p-3 border border-gr-600">
                    <FiFlag />
                  </span>
                </button>
              </div>
            </StickyBox>
          </div>

          <PostsComments
            imageHeight={imageHeight}
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
