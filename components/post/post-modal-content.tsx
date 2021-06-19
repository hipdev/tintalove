import { useRouter } from 'next/router'
import Post from 'components/post/post'
import { useEffect, useRef } from 'react'

const PostModalContent = ({
  postData,
  artistData,
  commentsData,
  morePostsArtist,
}) => {
  const router = useRouter()
  const postRef = useRef(null)

  useEffect(() => {
    postRef.current.scrollTop = 0
  }, [router])
  return (
    <div
      ref={postRef}
      className="inline-block h-screen align-bottom bg-transparent rounded-lg pt-5 pb-4 text-left overflow-y-scroll shadow-xl transform transition-all sm:align-middle  sm:w-full sm:p-6 md:w-5/5"
    >
      <Post
        postData={postData}
        artistData={artistData}
        commentsData={commentsData}
        morePostsArtist={morePostsArtist}
        closeModal={() => router.back()}
      />
    </div>
  )
}

export default PostModalContent
