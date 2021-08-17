import Layout from 'components/layout/Layout'
import { postsToJSON } from 'lib/firebase'
import { getPostsInfo } from 'lib/queries/posts'
import Home from 'components/home/home'

export default function IndexPage() {
  return (
    <Layout fixed>
      <Home />
    </Layout>
  )
}
