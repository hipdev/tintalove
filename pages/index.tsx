import { getArtistsInfo } from 'lib/db'
import { postsToJSON } from 'lib/firebase'
import Home from '../components/home/home'
import Layout from '../components/layout/layout'

export default function IndexPage({ artistsData }) {
  return (
    <Layout>
      <Home artists={artistsData} />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const { artists } = await getArtistsInfo()
  const artistsData = postsToJSON(artists)

  return {
    props: {
      artistsData,
    },
    revalidate: 50,
  }
}
