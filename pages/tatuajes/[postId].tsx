import Modal from 'react-modal'
import Layout from 'components/layout/Layout'
import { postsToJSON, postToJSON } from 'lib/firebase'
import debounce from 'lodash.debounce'
import {
  getMorePostFromArtist,
  getPostComments,
  getPostDataById,
  getPostsIds,
  getRelatedPosts,
} from 'lib/queries/posts'

import { useRouter } from 'next/router'
import { getArtistInfo } from 'lib/queries/artists'
import PostModalContent from 'components/post/PostModalContent'
import { useEffect, useRef, useState } from 'react'

export default function TattoosPage({
  postData,
  artistData,
  commentsData,
  morePostsArtist,
  relatedPosts,
}) {
  const router = useRouter()
  const ref = useRef(null)

  const [showUp, setShowUp] = useState(false)

  useEffect(() => {
    if (ref?.current) ref.current.scrollTop = 0
  }, [router, ref])

  const handleScroll = debounce((val) => {
    if (ref?.current?.scrollTop > 700) {
      setShowUp(true)
    } else {
      setShowUp(false)
    }
  }, 500)

  return (
    <>
      {postData && artistData && (
        <>
          <div>
            <Modal
              // overlayRef={(ref) => setRef(ref)}
              isOpen={!(router.query.postId == 'all')}
              overlayClassName="fixed left-0 right-0 bottom-0 top-0"
              className="bg-transparent  w-full px-0  absolute "
              // style={customStyles}
              style={{
                overlay: {
                  backgroundColor: '#0b0e19',
                  // top: 80,
                  zIndex: 10,
                  overflow: 'hidden',
                },
                content: {
                  background: 'transparent',
                  border: 'none',
                  top: 0,
                },
              }}
              onRequestClose={() => router.back()}
              contentLabel="Post modal"
            >
              <div
                className="overflow-y-auto fixed h-full w-full"
                ref={ref}
                onScroll={handleScroll}
              >
                <Layout>
                  <PostModalContent
                    postData={postData}
                    artistData={artistData}
                    commentsData={commentsData}
                    morePostsArtist={morePostsArtist}
                    relatedPosts={relatedPosts}
                    overlayRef={ref}
                    showUp={showUp}
                  />
                </Layout>
              </div>
            </Modal>
          </div>
        </>
      )}
      {!postData && (
        <p className="h-screen bg-dark-800 pt-32 text-4xl text-center font-bold text-gray-200">
          No existe este post
        </p>
      )}
    </>
  )
}

export async function getStaticPaths() {
  const postsList = await getPostsIds()

  console.log(postsList, 'lista de ids')

  const paths = postsList.map((doc: any) => ({
    params: {
      postId: doc.id,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = async ({ params }) => {
  let commentsData = null
  let postData = null
  let morePostsArtist = null
  let relatedPosts = null

  // console.log(params, 'params')

  if (params.postId) {
    try {
      const dataPost: any = await getPostDataById('get-post', params.postId)

      console.log(dataPost, 'data post')

      const dataComments = await getPostComments(params.postId)

      const dataPostByArtist = await getMorePostFromArtist(
        dataPost.artist_id,
        params.postId
      )

      console.log(dataPostByArtist, 'data related posts by artist')

      const dataRelatedPosts = await getRelatedPosts(dataPost.post.styles)

      // console.log(dataComments, 'los comments')

      postData = postToJSON(dataPost?.post)

      commentsData = postsToJSON(dataComments.comments)
      morePostsArtist = postsToJSON(dataPostByArtist.posts)
      relatedPosts = postsToJSON(dataRelatedPosts.posts)
    } catch (error) {
      console.log(error, 'Error obteniendo la info')
    }
  }

  return {
    props: {
      postData,
      commentsData,
      morePostsArtist,
      relatedPosts,
    },
    revalidate: 20,
  }
}
