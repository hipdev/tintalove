import Script from 'next/script'
import Layout from 'components/layout/layout'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { postsToJSON, postToJSON } from 'lib/firebase'
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

export default function TattoosPage({
  postData,
  artistData,
  commentsData,
  morePostsArtist,
  relatedPosts,
}) {
  const router = useRouter()

  return (
    <Layout>
      <Script src="https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js" />
      <Script src="https://www.gstatic.com/firebasejs/8.6.2/firebase-firestore.js" />
      {postData && artistData && (
        <>
          <Transition.Root show={!(router.query.postId == 'all')} as={Fragment}>
            <Dialog
              className="fixed z-10 inset-0 overflow-y-auto"
              open={!(router.query.postId == 'all')}
              onClose={() => router.back()}
            >
              <div className="flex  pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-dark-800 " />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>

                <PostModalContent
                  postData={postData}
                  artistData={artistData}
                  commentsData={commentsData}
                  morePostsArtist={morePostsArtist}
                  relatedPosts={relatedPosts}
                />
              </div>
            </Dialog>
          </Transition.Root>
        </>
      )}
      {!postData && (
        <p className="h-screen bg-dark-800 pt-32 text-4xl text-center font-bold text-gray-200">
          No existe este post
        </p>
      )}
    </Layout>
  )
}

export async function getStaticPaths() {
  const postList = await getPostsIds()

  const paths = postList.map((doc: any) => ({
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
  let artistData = null
  let morePostsArtist = null
  let relatedPosts = null

  // console.log(params, 'params')

  if (params.postId) {
    try {
      const dataPost: any = await getPostDataById('get-post', params.postId)
      const dataArtist = await getArtistInfo(dataPost.post.artist_id)
      const dataComments = await getPostComments(params.postId)

      const dataPostByArtist = await getMorePostFromArtist(
        dataPost.post.artist_id,
        params.postId
      )
      const dataRelatedPosts = await getRelatedPosts(dataPost.post.styles)

      // console.log(dataComments, 'los comments')

      postData = postToJSON(dataPost?.post)
      artistData = postToJSON(dataArtist.artist)
      commentsData = postsToJSON(dataComments.comments)
      morePostsArtist = postsToJSON(dataPostByArtist.posts)
      relatedPosts = postsToJSON(dataRelatedPosts.posts)
      console.log(relatedPosts, 'los otros posts')
    } catch (error) {
      console.log(error, 'Error obteniendo la info')
    }
  }

  return {
    props: {
      postData,
      commentsData,
      artistData,
      morePostsArtist,
      relatedPosts,
    },
    revalidate: 20,
  }
}
