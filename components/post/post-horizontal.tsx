import PostsComments from './post-comments'
import { PostTypes } from 'types/post'
import { ArtistTypes } from 'types/artist'
import { useState } from 'react'
import useUserId from 'hooks/use-user-id'
import { getUserInfo } from 'lib/queries/users'
import useSWR from 'swr'
import PostAside from './create/post-aside'

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
        <div className="mr-3 hidden sm:block">
          <PostAside postData={postData} />
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
