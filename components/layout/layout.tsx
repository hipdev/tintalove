import Footer from './footer'
import HeadContainer from './head'
import Header from './header/header'

type Props {
  artistData?: any
  children: any
}

const Layout = ({ children, artistData }:Props) => {
  return (
    <>
      <HeadContainer />
      <Header />
      <main className="bg-white">{children}</main>
      <Footer />
    </>
  )
}

export default Layout
