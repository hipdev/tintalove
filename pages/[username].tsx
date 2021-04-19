import {
  getArtistIdByUsername,
  getArtistInfo,
  getUserNamesByArtists,
} from 'lib/db'
import { useRouter } from 'next/router'

import Home from '../components/home/home'

export default function index({ artistId, artistInfo }: any) {
  const router: any = useRouter()

  if (router.isFallback) {
    return 'Loading'
  }

  if (!artistId) {
    return <p>No existe ese artista</p>
  }

  console.log(artistInfo, 'info del artista')

  return <p>Info del artista {} </p>
}

export async function getStaticPaths() {
  const usernamesList = await getUserNamesByArtists()

  console.log(usernamesList, 'lista de usernames')

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
  let artistData: any

  if (params.username) {
    try {
      artistId = await getArtistIdByUsername(params.username)

      console.log(artistId, 'el artista')

      try {
        artistData = await getArtistInfo(artistId)
      } catch (error) {
        console.log('Error obteniendo el logo')
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
