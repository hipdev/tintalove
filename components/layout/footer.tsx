import useOnClickOutside from 'hooks/use-clickoutside'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaFacebookSquare } from 'react-icons/fa'
import { MdHelpOutline } from 'react-icons/md'

const Footer = () => {
  const ref = useRef()
  const [showFooter, setShowFooter] = useState(false)

  useOnClickOutside(ref, () => {
    setShowFooter(false)
  })

  return (
    <>
      {showFooter ? (
        <footer
          style={{ boxShadow: '1px -1px 3px #020202' }}
          ref={ref}
          className={`${
            showFooter ? 'block' : 'hidden'
          } fixed bottom-0 w-full `}
        >
          <div className="flex flex-col lg:flex-row w-full justify-between px-2 sm:px-20 bg-dark-800 items-center pb-3 pt-2 uppercase">
            <div className="w-48 lg:w-60 mb-3 lg:mb-0">
              <Link href="/">
                <a className="relative bottom-3">
                  <img className="w-48 relative top-4" src="/newlogo.png" />
                </a>
              </Link>
            </div>
            <div className="w-full flex flex-wrap justify-end leading-7">
              <Link href="/">
                <a className="text-sm sm:text-base text-white mx-3">
                  Política de privacidad
                </a>
              </Link>
              <Link href="/">
                <a className="text-sm sm:text-base text-white mx-3">
                  Términos y condiciones
                </a>
              </Link>

              <Link href="/artist/main-info">
                <a className="text-sm sm:text-base text-white mx-3">
                  Soy un artista
                </a>
              </Link>

              <Link href="/studio-account/general">
                <a className="text-sm sm:text-base text-white mx-3">
                  Para estudios
                </a>
              </Link>

              <a
                className="text-white text-2xl mx-3"
                href="https://www.instagram.com/tinta.love/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineInstagram />
              </a>

              <Link href="/">
                <a className="text-white text-2xl mx-3">
                  <FaFacebookSquare />
                </a>
              </Link>
            </div>
          </div>
        </footer>
      ) : null}

      <div
        className={`${
          !showFooter ? 'block' : 'hidden'
        } } fixed bottom-5 right-5 text-gray-200 text-4xl cursor-pointer `}
        onClick={() => setShowFooter(!showFooter)}
      >
        <MdHelpOutline />
      </div>
    </>
  )
}

export default Footer
