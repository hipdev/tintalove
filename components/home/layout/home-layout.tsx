import Footer from 'components/layout/footer'
import HeadContainer from 'components/layout/head'
import Header from './header/header'

type Props = {
  artistData?: any
  children: any
}

const HomeLayout = ({ children, artistData }: Props) => {
  return (
    <>
      <HeadContainer />
      <Header />
      <main className="bg-white">{children}</main>
      <Footer />
    </>
  )
}

export default HomeLayout
