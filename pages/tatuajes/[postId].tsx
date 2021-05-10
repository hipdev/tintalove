import Layout from 'components/layout/layout'
import { postsToJSON, postToJSON } from 'lib/firebase'
import { getPostDataById, getPostsIds, getPostsInfo } from 'lib/queries/posts'
import Home from 'components/home/home'
import Modal from 'react-modal'
// import Post from 'components/post/post'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getArtistInfo } from 'lib/queries/artists'
import PostStatic from 'components/post/post-static'
// import PostStatic from 'components/post/post-static'

Modal.setAppElement('#__next')

export default function TattoosPage({ postsData, postData, artistData }) {
  const router = useRouter()

  console.log(postsData, postData, artistData, 'toda la data')
  console.log(router, 'router')

  return (
    <>
      {postData && artistData && (
        <Modal
          isOpen={!(router.query.postId == 'all')}
          onRequestClose={() =>
            router.push('/tatuajes/all', '', { scroll: false, shallow: true })
          }
          contentLabel="Post modal"
        >
          <PostStatic postData={postData} artistData={artistData} />
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
  console.log(withAll, 'esto que es')

  return {
    paths: withAll,
    fallback: true,
  }
}

export const getStaticProps = async ({ params }) => {
  let postsData = null
  let postData = null
  let artistData = null

  console.log(params, 'params')

  const { posts } = await getPostsInfo()
  postsData = postsToJSON(posts)

  if (params.postId != 'all') {
    try {
      const data: any = await getPostDataById(params.postId)
      const dataArtist = await getArtistInfo(data.post.artist_id)

      postData = postToJSON(data?.post)
      artistData = postToJSON(dataArtist.artist)
    } catch (error) {
      console.log(error, 'Error obteniendo la info')
    }
  }

  return {
    props: {
      postsData,
      postData,
      artistData,
    },
    revalidate: 50,
  }
}
