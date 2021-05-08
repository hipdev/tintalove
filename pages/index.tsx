import Layout from 'components/layout/layout'
import { postsToJSON } from 'lib/firebase'
import { getPostsInfo } from 'lib/queries/posts'
import Home from '../components/home/home'

export default function IndexPage({ postData }) {
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
