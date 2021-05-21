import useUserId from 'hooks/use-user-id'
import { getUserInfo } from 'lib/queries/users'
import { Toaster } from 'react-hot-toast'
import useSWR from 'swr'
import Footer from './footer'
import HeadContainer from './head'
import Header from './header/header'
import UserLists from './lists/user-lists'

type Props = {
  artistData?: any
  children: any
  userId?: string | null
}

const Layout = ({ children, artistData }: Props) => {
  const { userId } = useUserId()

  const { data, error } = useSWR(userId ? userId : null, getUserInfo)

  return (
    <>
      <Toaster
        toastOptions={{
          className: 'bg-red-600',
          style: {
            background: '#158e72',
            border: 'none',
            borderRadius: '3px',
            color: '#fff',
          },
          duration: 3000,
        }}
        position="bottom-right"
      />
      <HeadContainer />
      <Header user={data?.user || null} />
      <main className="bg-dark-800">{children}</main>
      <Footer />
      <UserLists user={data?.user || null} />
    </>
  )
}

export default Layout
