import ProfileStudio from 'components/layout-pages/w-profile-studios'
import Layout from 'components/layout/layout'

import { postToJSON } from 'lib/firebase'

import { getStudiosInfo, getStudioIdByUsername } from 'lib/queries/studios'
import { useRouter } from 'next/router'

export default function index({ studioId, studioData }: any) {
  const router: any = useRouter()

  if (router.isFallback) {
    return 'Loading'
  }

  if (!studioId) {
    return <p>No existe ese estudio</p>
  }
  console.log(studioData, studioId, 'el artista info')

  return (
    <Layout>
      <ProfileStudio studioData={studioData || null} />
    </Layout>
  )
}

export async function getStaticPaths() {
  const usernamesList = await getStudioIdByUsername(username)

  const paths = usernamesList.map((doc: any) => ({
    params: {
      usernames_studios: doc.usernames_studios,
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

  if (params.usernames_studio) {
    try {
      studioId = await getStudioIdByUsername(params.studio_id)

      try {
        const data = await getStudiosInfo()

        studioData = postToJSON(data?.usernames_studios)

        console.log(studioData, 'y eso que pasho')
      } catch (error) {
        console.log('Error obteniendo la info del estudio')
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
