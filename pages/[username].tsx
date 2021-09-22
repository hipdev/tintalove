import ArtistProfile from 'components/artist/ArtistProfile'
import Layout from 'components/layout/Layout'
import {
  getArtistDataByUsername,
  getArtistPictures,
  getUserNamesByArtists,
} from 'lib/queries/artists'
import { useRouter } from 'next/router'

const UsernameArtistPage = ({ artistData, artistPics }: any) => {
  const router: any = useRouter()

  if (router.isFallback) {
    return 'Loading'
  }

  console.log(artistData, 'el artista')

  return (
    <Layout>
      <ArtistProfile artistData={artistData} artistPics={artistPics} />
    </Layout>
  )
}

export default UsernameArtistPage

export async function getStaticPaths() {
  const usernamesList = await getUserNamesByArtists()

  console.log(usernamesList, 'usuarios')

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
      artistData = await getArtistDataByUsername(params.username)

      artistPics = await getArtistPictures('_', artistData.id)
      console.log(artistPics, 'las fotos')
      // Si falla uno fallan todos por esta dentro del mismo trycatch
    } catch (error) {
      console.log('Error obteniendo la info del artista')
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
