import { FiBookmark } from 'react-icons/fi'
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

const PostPortrait = ({
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
    <div className="flex flex-col xl:flex-row items-center xl:justify-between">
      <div className="mb-5 flex justify-center xl:justify-start w-full md:w-609">
        <div>
          <StickyBox offsetTop={0} offsetBottom={30}>
            <aside className="z-10 mr-4">
              <button className="block mb-2">
                <div className="flex flex-col justify-center items-center w-14 h-14 bg-ocean_blue-300 rounded-lg">
                  <span className="text-2xl text-green-500">
                    <FiBookmark />
                  </span>
                </div>
                <p className="text-atomico text-white tracking-wide">GUARDAR</p>
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
                <p className="text-atomico text-white tracking-wide flex-shrink">
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
        <img
          // src="https://via.placeholder.com/1100x621"
          src={
            postData?.image?.url
              ? `${postData.image.url}/tr:pr-true,c-at_max,f-auto,q-100`
              : 'https://via.placeholder.com/1100x621'
          }
          alt=""
          className=" object-cover rounded-lg max-w-md md:max-w-lg lg:max-w-2xl"
        />
      </div>

      <div className="flex flex-grow flex-col-reverse self-center xl:self-start w-full xl:w-1/2 ml-0 xl:ml-44 overflow-hidden overflow-ellipsis">
        <PostsComments
          postId={postData.id}
          userData={state?.user}
          commentsData={commentsData}
          setTotalComments={setTotalComments}
          totalComments={totalComments}
        />
      </div>
      <div className="fixed bottom-0 bg-ocean_blue-300 w-full">wsffdgh</div>
    </div>
  )
}

export default PostPortrait
