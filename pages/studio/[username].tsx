import ProfileStudio from 'components/layout-pages/w-profile-studios'
import Layout from 'components/layout/layout'

import { postToJSON } from 'lib/firebase'

import {
  getStudioIdByUsername,
  getUsernamesByStudios,
  getStudioInfo,
} from 'lib/queries/studios'
import { useRouter } from 'next/router'

export default function index({ studioId, studioData }: any) {
  const router: any = useRouter()

  if (router.isFallback) {
    return 'Loading'
  }

  if (!studioId) {
    return <p>No existe ese estudio</p>
  }

  return (
    <Layout>
      <ProfileStudio studioData={studioData || null} />
    </Layout>
  )
}

export async function getStaticPaths() {
  const studioUsernamesList = await getUsernamesByStudios()

  console.log(studioUsernamesList, 'usernames')

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

  if (params.username) {
    try {
      studioId = await getStudioIdByUsername(params.username)
      try {
        const studioInfo = await getStudioInfo(studioId)

        studioData = postToJSON(studioInfo?.studio)
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
