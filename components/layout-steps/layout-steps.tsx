import SideMenu from 'components/artist-account/side-menu'
import Image from 'next/image'
import Link from 'next/link'
import StepNav from './step-nav'

const LayoutSteps = ({ children }) => {
  return (
    <div className="grid grid-cols-10 h-screen">
      <div className="col-span-2 bg-dark-800 pl-12 pt-8 row-span-full">
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
      <div className="col-span-8 bg-dark-500 text-white">
        <header className="flex justify-between mt-5 pl-20">
          <Link href="/">
            <a>Volver al inicio</a>
          </Link>
          <div>
            <StepNav />
          </div>
        </header>
        <main className="pl-20">{children}</main>
      </div>
    </div>
  )
}

export default LayoutSteps
