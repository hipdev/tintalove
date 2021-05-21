import { Toaster } from 'react-hot-toast'
import Footer from './footer'
import HeadContainer from './head'
import UserLists from './lists/user-lists'
import dynamic from 'next/dynamic'

const HeaderDynamic = dynamic(() => import('./header/header'), { ssr: false })

type Props = {
  artistData?: any
  children: any
}

const Layout = ({ children, artistData }: Props) => {
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
      <HeaderDynamic />
      <main className="bg-dark-800">{children}</main>
      <Footer />
      <UserLists />
    </>
  )
}

export default Layout
