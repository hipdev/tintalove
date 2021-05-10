import ProfileStudios from 'components/layout-pages/w-profile-studios'
import { postsToJSON } from 'lib/firebase'
import { getStudiosInfo } from 'lib/queries/studios'

export default function ProfileStudiosPage({ studiosData }) {
  console.log(studiosData, 'esto que es')
  if (!studiosData) {
    return <span>No hay artistas registrados</span>
  }
  return (
    <>
      <ProfileStudios studiosData={studiosData} />
    </>
  )
}

export async function getStaticProps() {
  console.log('YO NO ME VEO EN EL BROWSER')
  let studiosData = null

  try {
    const data = await getStudiosInfo()
    console.log(data, 'esto que')

    studiosData = postsToJSON(data.studios)
  } catch (error) {
    console.log(error, 'Error obteniendo la info del artista')
  }

  return {
    props: {
      studiosData,
    },
    revalidate: 2,
  }
}
