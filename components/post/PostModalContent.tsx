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
      className="pt-5 pb-4 text-left 
       sm:align-middle w-full px-5  sm:w-full sm:px-10 2xl:px-16 2xl:pt-20 md:w-5/5 bg-dark-600"
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
