import Layout from 'components/layout/layout'
import { postsToJSON, postToJSON } from 'lib/firebase'
import {
  getPostComments,
  getPostDataById,
  getPostsIds,
  getPostsInfo,
} from 'lib/queries/posts'
import Home from 'components/home/home'
import Modal from 'react-modal'

import { useRouter } from 'next/router'

import { getArtistInfo } from 'lib/queries/artists'
import Post from 'components/post/post'

Modal.setAppElement('#__next')

export default function TattoosPage({
  postsData,
  postData,
  artistData,
  commentsData,
}) {
  const router = useRouter()

  console.log(postsData, postData, artistData, 'toda la data')
  console.log(router, 'router')

  return (
    <>
      {postData && artistData && (
        <Modal
          isOpen={!(router.query.postId == 'all')}
          // style={customStyles}
          style={{
            overlay: {
              position: 'fixed',
              backgroundColor: 'rgb(8 10 18 / 98%)',
              top: 80,
              right: 0,
              left: 0,
              bottom: 0,
              zIndex: 10,
            },
            content: {
              background: 'transparent',
              border: 'none',
              top: 0,
            },
          }}
          onRequestClose={() =>
            router.push('/tatuajes/all', '', { scroll: false, shallow: true })
          }
          contentLabel="Post modal"
        >
          <Post
            postData={postData}
            artistData={artistData}
            commentsData={commentsData}
          />
        </Modal>
      )}
      <Layout>{postsData && <Home posts={postsData} />}</Layout>
    </>
  )
}

export async function getStaticPaths() {
  const postList = await getPostsIds()

  const paths = postList.map((doc: any) => ({
    params: {
      postId: doc.id,
    },
  }))
  const withAll = [...paths, { params: { postId: 'all' } }]

  return {
    paths: withAll,
    fallback: true,
  }
}

export const getStaticProps = async ({ params }) => {
  let postsData = null
  let commentsData = null
  let postData = null
  let artistData = null

  console.log(params, 'params')

  const { posts } = await getPostsInfo()
  postsData = postsToJSON(posts)

  if (params.postId != 'all') {
    try {
      const dataPost: any = await getPostDataById(params.postId)
      const dataArtist = await getArtistInfo(dataPost.post.artist_id)
      const dataComments = await getPostComments(params.postId)

      console.log(dataComments, 'los comments')

      postData = postToJSON(dataPost?.post)
      artistData = postToJSON(dataArtist.artist)
      commentsData = postsToJSON(dataComments.comments)
    } catch (error) {
      console.log(error, 'Error obteniendo la info')
    }
  }

  return {
    props: {
      postsData,
      postData,
      commentsData,
      artistData,
    },
    revalidate: 50,
  }
}
