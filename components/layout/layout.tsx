import { Toaster } from 'react-hot-toast'
import Footer from './footer'
import HeadContainer from './head'
import Header from './header/header'
import UserLists from './lists/user-lists'

type Props = {
  artistData?: any
  children: any
  userId: string | null
}

const Layout = ({ children, artistData, userId }: Props) => {
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
      <Header userId={userId} />
      <main className="bg-dark-800">{children}</main>
      <Footer />
      <UserLists />
    </>
  )
}

export default Layout
