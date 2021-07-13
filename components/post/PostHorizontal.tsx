import PostsComments from './PostComments'
import { PostTypes } from 'types/post'
import { ArtistTypes } from 'types/artist'
import { useState } from 'react'
import PostAside from './PostAside'
import { UserState } from 'types/user'

const PostHorizontal = ({
  postData,
  artistData,
  user,
  commentsData,
}: {
  postData: PostTypes
  artistData: ArtistTypes
  commentsData: any
  user: UserState
}) => {
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
          user={user}
          commentsData={commentsData}
          setTotalComments={setTotalComments}
          totalComments={totalComments}
        />
      </div>
    </>
  )
}

export default PostHorizontal
