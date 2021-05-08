import Layout from 'components/layout/layout'
import Post from 'components/post/post'

import { postToJSON } from 'lib/firebase'
import { getArtistInfo } from 'lib/queries/artists'

import { getPostsIds, getPostDataById } from 'lib/queries/posts'
import { useRouter } from 'next/router'

export default function postPage({ postId, postData, artistData }: any) {
  const router: any = useRouter()

  if (router.isFallback) {
    return 'Loading'
  }

  if (!postData?.image) {
    return <p>No existe ese post</p>
  }

  return (
    // <Layout artistData={postData || null}>
    //   <Post postData={postData || null} postId={postId} />
    // </Layout>
    <Post postData={postData || null} postId={postId} artistData={artistData} />
  )
}

export async function getStaticPaths() {
  const postList = await getPostsIds()

  const paths = postList.map((doc: any) => ({
    params: {
      id: doc.id,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }: any) {
  let postData = null
  let artistData = null

  if (params.id) {
    try {
      const data = await getPostDataById(params.id)
      const dataArtist = await getArtistInfo(data.post.artist_id)

      postData = postToJSON(data?.post)
      artistData = postToJSON(dataArtist.artist)
    } catch (error) {
      console.log(error, 'Error obteniendo la info del artista')
    }
  }

  return {
    props: {
      postId: params.id,
      postData,
      artistData,
    },
    revalidate: 2,
  }
}
