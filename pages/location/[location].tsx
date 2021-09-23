import Layout from 'components/layout/Layout'
import Home from 'components/home/home'
import { getCitiesPaths } from 'lib/queries/general'
import { getPostsInfo, getPostsInfoByCity } from 'lib/queries/posts'

export default function TattoosPage() {
  return (
    <Layout fixed>
      <Home />
    </Layout>
  )
}

export async function getStaticPaths() {
  const citiesIds = await getCitiesPaths()
  const pathsLocations = citiesIds.map((doc: any) => ({
    params: {
      location: doc.city_name,
    },
  }))

  const withAll = [...pathsLocations, { params: { location: 'Colombia' } }]

  return {
    paths: withAll,
    fallback: true,
  }
}

export const getStaticProps = async ({ params }) => {
  let postsLocation = null

  if (params.location != 'Colombia') {
    postsLocation = await getPostsInfoByCity('_', params.location)

    // console.log(postsLocation, 'los posts cuando no es colombia')
  } else {
    postsLocation = await getPostsInfo('_')
  }

  return {
    props: {
      postsLocation,
    },
    revalidate: 20,
  }
}
