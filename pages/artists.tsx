import ArtistsList from 'components/artists/ArtistsList'
import { postsToJSON } from 'lib/firebase'
import { getArtistsInfo } from 'lib/queries/artists'

export default function ArtistPage({ artistsData }) {
  if (!artistsData) {
    return <span>No hay artistas registrados</span>
  }
  return (
    <>
      <ArtistsList artistsData={artistsData} />
    </>
  )
}

export async function getStaticProps() {
  let artistsData = null

  try {
    const data = await getArtistsInfo()

    artistsData = postsToJSON(data.artists)
  } catch (error) {
    console.log(error, 'Error obteniendo la info del artista')
  }

  return {
    props: {
      artistsData,
    },
    revalidate: 2,
  }
}
