import Layout from 'components/layout/layout'
import { postsToJSON } from 'lib/firebase'
import { getPostsInfo } from 'lib/queries/posts'
import Home from 'components/home/home'
import Modal from 'react-modal'
import Post from 'components/post/post'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

Modal.setAppElement('#__next')

export default function IndexPage({ postData }) {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(router, 'router en index')

  return (
    <>
      <Modal
        isOpen={!!router.query.postId}
        onRequestClose={() =>
          router.push('/', '/', { shallow: true, scroll: false })
        }
        contentLabel="Post modal"
      >
        <Post postId={router.query.postId} />
      </Modal>
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
