import useUserId from 'hooks/use-user-id'
import { getUserInfo } from 'lib/queries/users'
import { Toaster } from 'react-hot-toast'
import useSWR from 'swr'
import Footer from './Footer'
import HeadContainer from './HeadContainer'
import Header from './Header/Header'
import UserLists from './Lists/UserLists'
import NavFooter from './NavFooter'

type Props = {
  children: any
  userId?: string | null
  fixed?: boolean
}

const Layout = ({ children, fixed }: Props) => {
  const { userId } = useUserId()

  const { data } = useSWR(userId ? userId : null, getUserInfo)

  return (
    <>
      <Toaster
        toastOptions={{
          className: 'bg-red-600 mb-20 mr-3',
          style: {
            background: '#158e72',
            border: 'none',
            borderRadius: '3px',
            color: '#fff',
          },
          duration: 3000,
        }}
        containerStyle={{
          top: '5rem',
          right: '1rem',
        }}
        position="bottom-right"
      />
      <HeadContainer />
      <Header user={data?.user || null} fixed={fixed} />
      <main className="bg-dark-800">{children}</main>
      <Footer />
      <UserLists user={data?.user || null} />

      <NavFooter />
    </>
  )
}

export default Layout
