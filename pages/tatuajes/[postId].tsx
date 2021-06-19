import Script from 'next/script'
import Layout from 'components/layout/layout'
import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { postsToJSON, postToJSON } from 'lib/firebase'
import {
  getMorePostFromArtist,
  getPostComments,
  getPostDataById,
  getPostsIds,
} from 'lib/queries/posts'
import Modal from 'react-modal'

import { useRouter } from 'next/router'
import { getArtistInfo } from 'lib/queries/artists'
import Post from 'components/post/post'

Modal.setAppElement('#__next')

export default function TattoosPage({
  postData,
  artistData,
  commentsData,
  morePostsArtist,
}) {
  const router = useRouter()
  return (
    <Layout>
      <Script src="https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js" />
      <Script src="https://www.gstatic.com/firebasejs/8.6.2/firebase-firestore.js" />
      {postData && artistData && (
        <>
          {/* <Modal
            isOpen={!(router.query.postId == 'all')}
            overlayClassName="fixed left-0 right-0 bottom-0 overflow-auto"
            className="bg-transparent  overflow-auto w-full px-3 sm:px-7 absolute"
            // style={customStyles}
            style={{
              overlay: {
                backgroundColor: '#0b0e19',
                top: 80,
                zIndex: 10,
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
            <Post
              postData={postData}
              artistData={artistData}
              commentsData={commentsData}
              morePostsArtist={morePostsArtist}
              closeModal={() => router.back()}
            />
          </Modal> */}
          <Transition.Root show={!(router.query.postId == 'all')} as={Fragment}>
            <Dialog
              as="div"
              static
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
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="inline-block h-screen align-bottom bg-transparent rounded-lg pt-5 pb-4 text-left overflow-y-scroll shadow-xl transform transition-all sm:align-middle  sm:w-full sm:p-6 md:w-5/5">
                    <Post
                      postData={postData}
                      artistData={artistData}
                      commentsData={commentsData}
                      morePostsArtist={morePostsArtist}
                      closeModal={() => router.back()}
                    />
                  </div>
                </Transition.Child>
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

      // console.log(dataComments, 'los comments')

      postData = postToJSON(dataPost?.post)
      artistData = postToJSON(dataArtist.artist)
      commentsData = postsToJSON(dataComments.comments)
      morePostsArtist = postsToJSON(dataPostByArtist.posts)
      console.log(morePostsArtist, 'los otros posts')
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
    },
    revalidate: 20,
  }
}
