import Layout from 'components/layout/Layout'
import UserProfile from 'components/user/UserProfile'
import { AiOutlineLock } from 'react-icons/ai'
import { useUser } from 'hooks/useUser'

export default function UserProfilePage() {
  const { user } = useUser()

  return (
    <>
      <Layout>
        {user ? (
          <UserProfile user={user || null} />
        ) : (
          <div className="text-center mt-20 text-gray-300 text-4xl font-semibold">
            <p className="inline-flex flex-col items-center">
              No estas registrado
              <AiOutlineLock className="text-5xl mt-5 text-primary" />
            </p>
          </div>
        )}
      </Layout>
    </>
  )
}
