import Layout from 'components/layout/Layout'
import { useRouter } from 'next/router'
import UserList from 'components/list/UserList'
import { useUser } from 'hooks/useUser'

export default function ListPage() {
  const router = useRouter()
  const { user }: any = useUser()

  return (
    <>
      <Layout>
        {router.query.listId ? (
          <UserList listId={router.query.listId} user={user || null} />
        ) : (
          <span>No existe esta lista</span>
        )}
      </Layout>
    </>
  )
}
