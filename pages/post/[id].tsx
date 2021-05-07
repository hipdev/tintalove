import ArtistProfile from 'components/artist/profile'
import Post from 'components/home/w-post'
import Layout from 'components/layout/layout'

import { postToJSON } from 'lib/firebase'

import { getPostsIds, getPostDataById } from 'lib/queries/posts'
import { useRouter } from 'next/router'

export default function postPage({ postId, postData }: any) {
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
    <Post postData={postData || null} postId={postId} />
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

  if (params.id) {
    try {
      const data = await getPostDataById(params.id)

      postData = postToJSON(data?.post)
    } catch (error) {
      console.log(error, 'Error obteniendo la info del artista')
    }
  }

  return {
    props: {
      postId: params.id,
      postData,
    },
    revalidate: 2,
  }
}
