import useUserId from 'hooks/use-user-id'
import { getUserInfo } from 'lib/queries/users'
import { LoginContext } from 'pages/_app'
import { useContext } from 'react'
import { Toaster } from 'react-hot-toast'
import useSWR from 'swr'
import Footer from './footer'
import HeadContainer from './head'
import Header from './header/header'
import LoginModal from './header/LoginModal'
import UserLists from './lists/UserLists'
import NavFooter from './NavFooter'

type Props = {
  children: any
  userId?: string | null
  fixed?: boolean
}

const Layout = ({ children, fixed }: Props) => {
  const { isOpen } = useContext(LoginContext)
  const { userId } = useUserId()

  const { data } = useSWR(userId ? userId : null, getUserInfo)

  return (
    <>
      {isOpen && <LoginModal />}
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

      <NavFooter user={data?.user || null} />
    </>
  )
}

export default Layout
