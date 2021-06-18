import PostsComments from './post-comments'
import { PostTypes } from 'types/post'
import { ArtistTypes } from 'types/artist'
import { useState } from 'react'
import useUserId from 'hooks/use-user-id'
import useSWR from 'swr'
import { getUserInfo } from 'lib/queries/users'
import PostAside from './create/post-aside'
import Image from 'next/image'

const loaderPost = ({ src, quality }: any) => {
  return `${src}/tr:pr-true,c-at_max,f-auto,q-${quality || 75}`
}

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
      <div className="mb-5 flex justify-center xl:justify-start w-full sm:w-3/5 md:w-3/5">
        <div className="mr-3 hidden sm:block">
          <PostAside postData={postData} />
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

      <div className="flex flex-grow flex-col-reverse self-center xl:self-start w-full xl:w-1/2 ml-0 xl:ml-44 overflow-hidden overflow-ellipsis">
        <PostsComments
          postId={postData.id}
          user={data?.user || null}
          commentsData={commentsData}
          setTotalComments={setTotalComments}
          totalComments={totalComments}
        />
      </div>
    </div>
  )
}

export default PostPortrait
