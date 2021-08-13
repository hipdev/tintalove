import Layout from 'components/layout/Layout'
import { useRouter } from 'next/router'
import useUserId from 'hooks/use-user-id'
import useSWR from 'swr'
import { getUserInfo } from 'lib/queries/users'
import UserProfile from 'components/user/UserProfile'
import { AiOutlineLock } from 'react-icons/ai'

export default function UserProfilePage() {
  const router = useRouter()
  const { userId } = useUserId()
  const { data } = useSWR(userId ? userId : null, getUserInfo)

  return (
    <>
      <Layout>
        {data ? (
          <UserProfile user={data?.user || null} />
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
