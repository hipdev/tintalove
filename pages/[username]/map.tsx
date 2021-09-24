import ArtistMap from 'components/artist/ArtistMap'
import Layout from 'components/layout/Layout'
import { Loader } from '@googlemaps/js-api-loader'
import {
  getArtistDataByUsername,
  getUserNamesByArtists,
} from 'lib/queries/artists'
import { useRouter } from 'next/router'
import { useState } from 'react'

const loader = new Loader({
  apiKey: 'AIzaSyA5drETj_sJmO1kGEDEb7tXWzwJb05ipCY', // api key de google maps
  libraries: ['places'],
})

const UsernameArtistPage = ({ artistData }: any) => {
  const [loadMap, setLoadMap] = useState(false)
  const router: any = useRouter()

  if (router.isFallback) {
    return 'Loading'
  }

  loader
    .load()
    .then(() => {
      setLoadMap(true)
    })
    .catch((e) => {
      console.log('error loading Google Maps API')
    })

  return <Layout>{loadMap && <ArtistMap artistData={artistData} />}</Layout>
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
  let artistData = null

  if (params.username) {
    try {
      artistData = await getArtistDataByUsername(params.username)
      // Si falla uno fallan todos por esta dentro del mismo trycatch
    } catch (error) {
      console.log('Error obteniendo la info del artista')
    }
  }

  // churchId.url = `${process.env.NEXT_PUBLIC_ROOT_URL}/post/${post.slug}`

  return {
    props: {
      artistData,
    },
    revalidate: 2,
  }
}
