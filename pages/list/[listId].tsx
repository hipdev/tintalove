import Layout from 'components/layout/layout'

import { useRouter } from 'next/router'
import UserList from 'components/list/user-list'
import { getListsIds, getUserListItems } from 'lib/queries/lists'
import { postsToJSON, postToJSON } from 'lib/firebase'

export default function ListPage({ listItemsData, listData }) {
  if (!listData?.list_name) {
    return (
      <div className="h-screen flex justify-center pt-10">
        <p className="text-gray-300 text-3xl">Ups, esta lista no existe</p>
      </div>
    )
  }

  return (
    <>
      <Layout>
        <UserList listData={listData} listItemsData={listItemsData} />
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const listIds = await getListsIds()

  const paths = listIds.map((doc: any) => ({
    params: {
      listId: doc.id,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = async ({ params }) => {
  let listItemsData = null
  let listData = null

  console.log(params, 'params')

  if (params.listId) {
    try {
      const { userListItems, userList } = await getUserListItems(params.listId)

      listItemsData = postsToJSON(userListItems)
      listData = postToJSON(userList)
    } catch (error) {
      console.log(error, 'Error obteniendo la info')
    }
  }

  return {
    props: {
      listItemsData,
      listData,
    },
    revalidate: 50,
  }
}
