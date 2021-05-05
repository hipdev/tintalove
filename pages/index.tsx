import HomeLayout from 'components/home/layout/home-layout'
import { postsToJSON } from 'lib/firebase'
import { getArtistsInfo } from 'lib/queries/artists'
import Home from '../components/home/home'

export default function IndexPage({ artistsData }) {
  return (
    <HomeLayout>
      <Home artists={artistsData} />
    </HomeLayout>
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
