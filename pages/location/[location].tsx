import Layout from 'components/layout/layout'
import { postsToJSON, postToJSON } from 'lib/firebase'
import { getPostsInfo } from 'lib/queries/posts'
import Home from 'components/home/home'
import { getCitiesPaths, getLatLngFromCityId } from 'lib/queries/general'
import { getPostsByCity } from 'lib/queries/geo'

export default function TattoosPage({ postsData }) {
  return <Layout>{postsData && <Home posts={postsData} />}</Layout>
}

export async function getStaticPaths() {
  const citiesIds = await getCitiesPaths()
  const pathsLocations = citiesIds.map((doc: any) => ({
    params: {
      location: doc.id,
    },
  }))

  const withAll = [...pathsLocations, { params: { location: 'Colombia' } }]

  return {
    paths: withAll,
    fallback: true,
  }
}

export const getStaticProps = async ({ params }) => {
  let postsData = null

  console.log(params, 'params')

  const splitLocation = params.location.split('~')
  const latLng = [parseFloat(splitLocation[1]), parseFloat(splitLocation[2])]

  // console.log(latLng, 'lat y lng')

  if (params.location == 'Colombia') {
    const { posts } = await getPostsInfo()
    postsData = postsToJSON(posts)
  } else {
    const { latLng } = await getLatLngFromCityId(params.location)
    const { posts } = await getPostsByCity(latLng)
    postsData = postsToJSON(posts)
  }

  return {
    props: {
      postsData,
    },
    revalidate: 20,
  }
}
