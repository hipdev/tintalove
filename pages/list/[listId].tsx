import Layout from 'components/layout/layout'
import { useRouter } from 'next/router'
import UserList from 'components/list/user-list'
import useUserId from 'hooks/use-user-id'
import useSWR from 'swr'
import { getUserInfo } from 'lib/queries/users'

export default function ListPage() {
  const router = useRouter()
  const { userId } = useUserId()
  const { data, error } = useSWR(userId ? userId : null, getUserInfo)

  console.log(data, 'data en User List')

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
