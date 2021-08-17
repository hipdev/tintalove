import Layout from 'components/layout/Layout'
import { postsToJSON } from 'lib/firebase'
import { getPostsInfo } from 'lib/queries/posts'
import Home from 'components/home/home'
import { getCitiesPaths, getLatLngFromCityId } from 'lib/queries/general'
import { getPostsByCity } from 'lib/queries/geo'

export default function TattoosPage({ latLng }) {
  return (
    <Layout fixed>
      <Home latLng={latLng} />
    </Layout>
  )
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
  let latnLng = null

  if (params.location != 'Colombia') {
    const { latLng } = await getLatLngFromCityId(params.location)
    latnLng = latLng
  }

  return {
    props: {
      latLng: latnLng,
    },
    revalidate: 20,
  }
}
