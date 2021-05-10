import ProfileStudios from 'components/layout-pages/w-profile-studios'
import Layout from 'components/layout/layout'

import { postToJSON } from 'lib/firebase'

import { getStudioInfo, getStudioIdByUsername } from 'lib/queries/studios'
import { useRouter } from 'next/router'

export default function index({ studioId, studioData }: any) {
  const router: any = useRouter()

  if (router.isFallback) {
    return 'Loading'
  }

  if (!studioId) {
    return <p>No existe ese artista</p>
  }
  console.log(studioData, studioId, 'el artista info')

  return (
    <Layout artistData={studioData  null}>
      <ProfileStudios studiosData={studioData  null} />
    </Layout>
  )
}

export async function getStaticProps({ params }: any) {
  let studioId = null
  let studioData = null

  if (params.username) {
    try {
      studioId = await getStudioIdByUsername(params.username)

      try {
        const data = await getStudioInfo(studioId)

        studioData = postToJSON(data?.studio)

        console.log(studioData, 'y eso que pasho')
      } catch (error) {
        console.log('Error obteniendo la info del artista')
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
    },
    revalidate: 2,
  }
}