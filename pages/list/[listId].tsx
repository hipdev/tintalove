import Layout from 'components/layout/Layout'
import { useRouter } from 'next/router'
import UserList from 'components/list/UserList'
import useUserId from 'hooks/use-user-id'
import useSWR from 'swr'
import { getUserInfo } from 'lib/queries/users'

export default function ListPage() {
  const router = useRouter()
  const { userId } = useUserId()
  const { data, error } = useSWR(userId ? userId : null, getUserInfo)

  return (
    <>
      <Layout>
        {router.query.listId ? (
          <UserList listId={router.query.listId} user={data?.user || null} />
        ) : (
          <span>No existe esta lista</span>
        )}
      </Layout>
    </>
  )
}
