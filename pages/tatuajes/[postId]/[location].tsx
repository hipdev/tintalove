import Layout from 'components/layout/layout'
import { postsToJSON, postToJSON } from 'lib/firebase'
import {
  getPostComments,
  getPostDataById,
  getPostsByCity,
  getPostsIds,
  getPostsInfo,
} from 'lib/queries/posts'
import Home from 'components/home/home'
import Modal from 'react-modal'

import { useRouter } from 'next/router'

import { getCitiesPaths } from 'lib/queries/general'
import { getArtistInfo } from 'lib/queries/artists'
import Post from 'components/post/post'

// Modal.setAppElement('#__next')

export default function TattoosPage({
  postsData,
  postData,
  artistData,
  commentsData,
}) {
  const router = useRouter()

  const closeModal = () => {
    if (router.query.listId) {
      router.push(`/list/${router.query.listId}`, '', {
        scroll: false,
        shallow: true,
      })
    } else {
      if (router.query.location) {
        router.push(`/tatuajes/all/${router.query.location}`, '', {
          scroll: false,
          shallow: true,
        })
      } else {
        router.push('/tatuajes/all', '', {
          scroll: false,
          shallow: true,
        })
      }
    }
  }

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
          onRequestClose={closeModal}
          contentLabel="Post modal"
        >
          <Post
            postData={postData}
            artistData={artistData}
            commentsData={commentsData}
            closeModal={closeModal}
          />
        </Modal>
      )}
      {postsData && <Home posts={postsData} />}
    </Layout>
  )
}

export async function getStaticPaths() {
  const postList = await getPostsIds()
  const citiesIds = await getCitiesPaths()

  const paths = postList.map((doc: any) => ({
    params: {
      postId: doc.id,
      location: 'all-colombia',
    },
  }))

  const pathsLocations = citiesIds.map((doc: any) => ({
    params: {
      postId: 'all',
      location: doc.id,
    },
  }))

  const withAll = [
    ...paths,
    ...pathsLocations,
    { params: { postId: 'all', location: 'all-colombia' } },
  ]
  // console.log(withAll, 'esto es all')

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

  // console.log(params, 'params')

  const splitLocation = params.location.split('~')
  const latLng = [parseInt(splitLocation[1]), parseInt(splitLocation[2])]

  // console.log(latLng, 'lat y lng')

  if (params.location == 'all-colombia') {
    const { posts } = await getPostsInfo()
    postsData = postsToJSON(posts)
  }

  if (latLng[0] && latLng[1]) {
    const { matchingDocs } = await getPostsByCity(latLng)
    console.log(matchingDocs, 'los posts!')
    // postsData = postsToJSON(matchingDocs)
  }

  if (params.postId != 'all') {
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
      postsData,
      postData,
      commentsData,
      artistData,
    },
    revalidate: 20,
  }
}
