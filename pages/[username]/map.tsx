import ArtistMap from 'components/artist/ArtistMap'
import Layout from 'components/layout/layout'

import { postToJSON } from 'lib/firebase'
import {
  getArtistIdByUsername,
  getArtistInfo,
  getUserNamesByArtists,
} from 'lib/queries/artists'
import { useRouter } from 'next/router'

const UsernameArtistPage = ({ artistId, artistData }: any) => {
  const router: any = useRouter()

  if (router.isFallback) {
    return 'Loading'
  }

  if (!artistId) {
    return <p>No existe ese artista</p>
  }

  return (
    <Layout>
      <ArtistMap artistData={artistData} />
    </Layout>
  )
}

export default UsernameArtistPage

export async function getStaticPaths() {
  const usernamesList = await getUserNamesByArtists()

  const paths = usernamesList.map((doc: any) => ({
    params: {
      username: doc.username,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }: any) {
  let artistId = null
  let artistData = null

  if (params.username) {
    try {
      artistId = await getArtistIdByUsername(params.username)

      try {
        const data = await getArtistInfo(artistId)

        artistData = postToJSON(data?.artist)
        // Si falla uno fallan todos por esta dentro del mismo trycatch
      } catch (error) {
        console.log('Error obteniendo la info del artista')
      }
    } catch (err) {
      if (err.status !== 404) {
        console.log('error!')
      }
    }
  }

  // churchId.url = `${process.env.NEXT_PUBLIC_ROOT_URL}/post/${post.slug}`

  return {
    props: {
      artistId,
      artistData,
    },
    revalidate: 2,
  }
}
