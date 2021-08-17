import Layout from 'components/layout/Layout'
import { postsToJSON } from 'lib/firebase'
import { getPostsInfo } from 'lib/queries/posts'
import Home from 'components/home/home'

export default function IndexPage({ postData }) {
  return (
    <Layout fixed>
      <Home posts={postData} />
    </Layout>
  )
}

export const getStaticProps = async () => {
  let postsData
  try {
    const { posts } = await getPostsInfo()
    postsData = posts
  } catch (error) {
    console.log(error)
  }
  const postData = postsToJSON(postsData)

  return {
    props: {
      postData,
    },
    revalidate: 50,
  }
}
