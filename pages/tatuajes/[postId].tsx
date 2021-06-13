import Layout from 'components/layout/layout'
import { postsToJSON, postToJSON } from 'lib/firebase'
import {
  getPostComments,
  getPostDataById,
  getPostsIds,
} from 'lib/queries/posts'
import Modal from 'react-modal'

import { useRouter } from 'next/router'
import { getArtistInfo } from 'lib/queries/artists'
import Post from 'components/post/post'

Modal.setAppElement('#__next')

export default function TattoosPage({ postData, artistData, commentsData }) {
  const router = useRouter()

  console.log(router, 'el router')
  return (
    <Layout>
      {postData && artistData && (
        <Modal
          isOpen={!(router.query.postId == 'all')}
          overlayClassName="fixed left-0 right-0 bottom-0 overflow-auto"
          className="bg-transparent  overflow-auto w-full px-3 sm:px-7 absolute"
          // style={customStyles}
          style={{
            overlay: {
              backgroundColor: 'rgb(8 10 18 / 98%)',
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
            closeModal={() => router.back()}
          />
        </Modal>
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

  // console.log(params, 'params')

  if (params.postId) {
    try {
      const dataPost: any = await getPostDataById('get-post', params.postId)
      const dataArtist = await getArtistInfo(dataPost.post.artist_id)
      const dataComments = await getPostComments(params.postId)

      // console.log(dataComments, 'los comments')

      postData = postToJSON(dataPost?.post)
      artistData = postToJSON(dataArtist.artist)
      commentsData = postsToJSON(dataComments.comments)
    } catch (error) {
      console.log(error, 'Error obteniendo la info')
    }
  }

  return {
    props: {
      postData,
      commentsData,
      artistData,
    },
    revalidate: 20,
  }
}
