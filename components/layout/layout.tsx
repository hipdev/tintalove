import Footer from './footer'
import HeadContainer from './head'
import Header from './header/header'
import NewHeader from './header/header'

type Props = {
  artistData?: any
  children: any
}

const Layout = ({ children, artistData }: Props) => {
  return (
    <>
      <HeadContainer />
      <Header />
      <main className="bg-dark-800">{children}</main>
      <Footer />
    </>
  )
}

export default Layout
