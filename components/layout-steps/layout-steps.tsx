import SideMenu from 'components/artist-account/side-menu'
import Image from 'next/image'
import StepNav from './step-nav'

const Layout = ({ children }) => {
  return (
    <div>
      <div>
        <div className="w-52 relative h-11">
          <Image
            // layout="fill"
            width={180}
            height={35}
            src="/short-logo.png"
            alt="Picture of the author"
          />
        </div>
        <SideMenu />
      </div>
      <div>
        <header>
          <div>Volver al inicio</div>
          <div>
            <StepNav />
          </div>
        </header>
        <main className="bg-white">{children}</main>
      </div>
    </div>
  )
}

export default Layout
