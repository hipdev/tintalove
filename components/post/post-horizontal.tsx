import { FiBookmark } from 'react-icons/fi'
import { FaRegCommentDots } from 'react-icons/fa'
import { RiHeartLine } from 'react-icons/ri'
import { FiSend } from 'react-icons/fi'
import PostsComments from './post-comments'
import StickyBox from 'react-sticky-box'
import { PostTypes } from 'types/post'
import { ArtistTypes } from 'types/artist'
import { useState } from 'react'
import useUserId from 'hooks/use-user-id'
import { getUserInfo } from 'lib/queries/users'
import useSWR from 'swr'

const PostHorizontal = ({
  postData,
  artistData,
  commentsData,
}: {
  postData: PostTypes
  artistData: ArtistTypes
  commentsData: any
}) => {
  const { userId } = useUserId()
  const { data } = useSWR(userId ? userId : null, getUserInfo)

  const [totalComments, setTotalComments] = useState(
    postData.counter_comments || 0
  )

  return (
    <>
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

        <div>
          <StickyBox offsetTop={0} offsetBottom={30}>
            <aside className="z-10 ml-4">
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
                <p className="text-atomico text-black tracking-wide">
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
          user={data?.user}
          commentsData={commentsData}
          setTotalComments={setTotalComments}
          totalComments={totalComments}
        />
      </div>
    </>
  )
}

export default PostHorizontal
