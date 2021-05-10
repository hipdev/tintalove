import Layout from 'components/layout/layout'
import { postsToJSON } from 'lib/firebase'
import { getPostsInfo } from 'lib/queries/posts'
import Home from 'components/home/home'
import Modal from 'react-modal'
// import Post from 'components/post/post'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
// import PostStatic from 'components/post/post-static'

Modal.setAppElement('#__next')

export default function IndexPage({ postData }) {
  const router = useRouter()

  return (
    <>
      <Layout>
        <Home posts={postData} />
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const { posts } = await getPostsInfo()
  const postData = postsToJSON(posts)

  return {
    props: {
      postData,
    },
    revalidate: 50,
  }
}
