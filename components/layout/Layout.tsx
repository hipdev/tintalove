import { useUser } from 'hooks/useUser'
import { LoginContext } from 'pages/_app'
import { useContext } from 'react'
import { Toaster } from 'react-hot-toast'
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
  const { user }: any = useUser()

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

      <Header user={user} fixed={fixed} />

      <main className="bg-dark-800">{children}</main>

      <Footer />

      <UserLists user={user || null} />

      <NavFooter user={user || null} />
    </>
  )
}

export default Layout
