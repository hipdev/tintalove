import Layout from 'components/layout/Layout'
import IsAuth from 'components/isAuth'
import useUser from 'hooks/use-user'
import AdminUsers from 'admin-components/users/users'

export default function UsersPage() {
  const { state } = useUser()
  console.log(state, 'user')
  const isAdmin = state?.user?.is_admin

  return (
    <Layout>
      <IsAuth>{isAdmin ? <AdminUsers /> : null}</IsAuth>
    </Layout>
  )
}
