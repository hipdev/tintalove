import ProfileStudios from 'components/layout-pages/ProfileStudios'
import Layout from 'components/layout/layout'
import { postsToJSON } from 'lib/firebase'
import { getStudiosInfo } from 'lib/queries/studios'

export default function ProfileStudiosPage({ studioData }) {
  if (!studioData) {
    return <span>No hay artistas registrados</span>
  }
  return (
    <Layout>
      <ProfileStudios studioData={studioData} />
    </Layout>
  )
}

export async function getStaticProps() {
  let studioData = null

  try {
    const data = await getStudiosInfo()

    studioData = postsToJSON(data.usernames_studios)
  } catch (error) {
    console.log(error, 'Error obteniendo la info del artista')
  }

  return {
    props: {
      studioData,
    },
    revalidate: 2,
  }
}
