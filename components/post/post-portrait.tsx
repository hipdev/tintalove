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
import useSWR from 'swr'
import { getUserInfo } from 'lib/queries/users'
import PostAside from './create/post-aside'

const PostPortrait = ({
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
  console.log(data, 'la data user')
  return (
    <div className="flex flex-col xl:flex-row items-center xl:justify-between">
      <div className="mb-5 flex justify-center xl:justify-start w-full md:w-609">
        <div className="mr-3 hidden">
          <PostAside postData={postData} />
        </div>
        <img
          // src="https://via.placeholder.com/1100x621"
          src={
            postData?.image?.url
              ? `${postData.image.url}/tr:pr-true,c-at_max,f-auto,q-100`
              : 'https://via.placeholder.com/1100x621'
          }
          alt=""
          className=" object-cover rounded-lg  md:max-w-lg lg:max-w-2xl"
        />
      </div>

      <div className="flex flex-grow flex-col-reverse self-center xl:self-start w-full xl:w-1/2 ml-0 xl:ml-44 overflow-hidden overflow-ellipsis">
        <PostsComments
          postId={postData.id}
          user={data?.user || null}
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
