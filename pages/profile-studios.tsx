import ProfileStudios from 'components/layout-pages/ProfileStudios'
import { postsToJSON } from 'lib/firebase'
import { getStudiosInfo } from 'lib/queries/studios'

export default function ProfileStudiosPage({ studioData }) {
  console.log(studioData, 'esto que es')
  if (!studioData) {
    return <span>No hay artistas registrados</span>
  }
  return (
    <>
      <ProfileStudios studioData={studioData} />
    </>
  )
}

export async function getStaticProps() {
  console.log('YO NO ME VEO EN EL BROWSER')
  let studioData = null

  try {
    const data = await getStudiosInfo()
    console.log(data, 'esto que')

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
