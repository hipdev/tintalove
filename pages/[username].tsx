import ArtistProfile from 'components/artist/ArtistProfile'
import Layout from 'components/layout/layout'

import { postsToJSON, postToJSON } from 'lib/firebase'
import {
  getArtistIdByUsername,
  getArtistInfo,
  getArtistPictures,
  getUserNamesByArtists,
} from 'lib/queries/artists'
import { useRouter } from 'next/router'

const UsernameArtistPage = ({ artistId, artistData, artistPics }: any) => {
  const router: any = useRouter()

  if (router.isFallback) {
    return 'Loading'
  }

  if (!artistId) {
    return <p>No existe ese artista</p>
  }

  return (
    <Layout>
      <ArtistProfile artistData={artistData} artistPics={artistPics} />
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
  let artistPics = null

  if (params.username) {
    try {
      artistId = await getArtistIdByUsername(params.username)

      try {
        const data = await getArtistInfo('_key', artistId)
        const dataPics = await getArtistPictures('_', artistId)

        artistData = postToJSON(data?.artist)
        artistPics = postsToJSON(dataPics?.pictures)
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
      artistPics,
    },
    revalidate: 2,
  }
}
