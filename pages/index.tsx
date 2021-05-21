import Layout from 'components/layout/layout'
import { postsToJSON } from 'lib/firebase'
import { getPostsInfo } from 'lib/queries/posts'
import Home from 'components/home/home'

import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useUserId from 'hooks/use-user-id'
// import PostStatic from 'components/post/post-static'

export default function IndexPage({ postData }) {
  const router = useRouter()

  const { userId } = useUserId()

  return (
    <>
      <Layout userId={userId}>
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
