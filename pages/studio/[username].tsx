import { Loader } from '@googlemaps/js-api-loader'

import StudioProfile from 'components/studio-profile/StudioProfile'
import Layout from 'components/layout/Layout'

import { postsToJSON, postToJSON } from 'lib/firebase'

import {
  getStudioIdByUsername,
  getUsernamesByStudios,
  getStudioInfo,
  getStudioPictures,
} from 'lib/queries/studios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState } from 'react'

const loader = new Loader({
  apiKey: 'AIzaSyA5drETj_sJmO1kGEDEb7tXWzwJb05ipCY', // api key de google maps
  libraries: ['places'],
})

const UsernameStudioPage = ({ studioId, studioData, studioPictures }: any) => {
  const [loadMap, setLoadMap] = useState(false)
  const router: any = useRouter()

  if (router.isFallback) {
    return <span>Loading</span>
  }

  loader
    .load()
    .then(() => {
      setLoadMap(true)
    })
    .catch((e) => {
      console.log('error loading Google Maps API')
    })

  if (!studioId) {
    return (
      <div className="text-gray-300 flex flex-col justify-center items-center">
        <p className="text-4xl font-bold  text-center pt-20">
          No existe ese estudio
        </p>

        <Link href="/">
          <a className="mt-10 font-semibold uppercase hover:text-gn-300">
            Volver
          </a>
        </Link>
      </div>
    )
  }

  return (
    <Layout>
      {/* {studioData} */}
      {loadMap && (
        <StudioProfile
          studioData={studioData || null}
          studioPictures={studioPictures || null}
        />
      )}
    </Layout>
  )
}

export default UsernameStudioPage

export async function getStaticPaths() {
  const studioUsernamesList = await getUsernamesByStudios()

  const paths = studioUsernamesList.map((doc: any) => ({
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
  let studioId = null
  let studioData = null
  let studioPictures = null

  if (params.username) {
    try {
      studioId = await getStudioIdByUsername(params.username)

      if (studioId) {
        try {
          const studioInfo = await getStudioInfo('_', studioId)
          const dataPics = await getStudioPictures('_', studioId)

          studioData = postToJSON(studioInfo?.studio)
          studioPictures = postsToJSON(dataPics?.pictures)
        } catch (error) {
          console.log('Error obteniendo la info del estudio')
        }
      }
    } catch (err) {
      if (err.status !== 404) {
        console.log('error!')
      }
    }
  }

  // churchId.url = ${process.env.NEXT_PUBLIC_ROOT_URL}/post/${post.slug}

  return {
    props: {
      studioId,
      studioData,
      studioPictures,
    },
    revalidate: 2,
  }
}
