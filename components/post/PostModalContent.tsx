import { useRouter } from 'next/router'
import Post from 'components/post/post'
import { useEffect, useRef } from 'react'

const PostModalContent = ({
  postData,
  artistData,
  commentsData,
  morePostsArtist,
  relatedPosts,
}) => {
  const router = useRouter()
  const postRef = useRef(null)

  useEffect(() => {
    postRef.current.scrollTop = 0
  }, [router])
  return (
    <div
      ref={postRef}
      className="align-bottom bg-dark-600 rounded-lg pt-5 pb-4 text-left 
       shadow-xl sm:align-middle w-full px-5  sm:w-full sm:px-10 2xl:px-16 md:w-5/5 2xl:mt-20"
    >
      <Post
        postData={postData}
        artistData={artistData}
        commentsData={commentsData}
        morePostsArtist={morePostsArtist}
        relatedPosts={relatedPosts}
        closeModal={() => router.back()}
      />
    </div>
  )
}

export default PostModalContent
