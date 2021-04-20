import Footer from './footer'
import HeadContainer from './head'
import Header from './header/header'

const Layout = ({ children, artistData }) => {
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
