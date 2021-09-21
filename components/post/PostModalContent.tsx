import { useRouter } from 'next/router'
import PostStatic from 'components/post/PostStatic'

const PostModalContent = ({
  postData,
  artistData,
  commentsData,
  morePostsArtist,
  relatedPosts,
  overlayRef,
  showUp,
}) => {
  const router = useRouter()

  return (
    <div
      className="align-bottom bg-dark-800 rounded-lg pt-5 pb-4 text-left 
       shadow-xl sm:align-middle w-full px-5  sm:w-full sm:px-10 2xl:px-16 md:w-5/5 "
    >
      <PostStatic
        postData={postData}
        artistData={artistData}
        commentsData={commentsData}
        morePostsArtist={morePostsArtist}
        relatedPosts={relatedPosts}
        overlayRef={overlayRef}
        closeModal={() => router.back()}
        showUp={showUp}
      />
    </div>
  )
}

export default PostModalContent
