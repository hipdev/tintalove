import SideMenu from 'components/artist-account/side-menu'
import Image from 'next/image'
import StepNav from './step-nav'

const LayoutSteps = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-1/4 bg-dark-800 pl-12 pt-8 h-screen">
        <div className="w-52 relative h-11 mb-20">
          <Image
            // layout="fill"
            width={252}
            height={49}
            src="/short-logo.png"
            alt="Picture of the author"
          />
        </div>
        <SideMenu />
      </div>
      <div className="w-3/4 bg-dark-500">
        <header className="flex justify-between">
          <div>Volver al inicio</div>
          <div>
            <StepNav />
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  )
}

export default LayoutSteps
