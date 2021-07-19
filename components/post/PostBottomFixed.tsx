import Link from 'next/link'
import { AiOutlineCalendar } from 'react-icons/ai'
import { FaWhatsapp } from 'react-icons/fa'
import { IoIosArrowUp } from 'react-icons/io'
import { ArtistTypes } from 'types/artist'

const PostBottomFixed = ({
  artistData,
  overlayRef,
}: {
  artistData: ArtistTypes
  overlayRef: any
}) => {
  const goTop = () => {
    overlayRef.scrollTop = 0
  }
  return (
    <div className="fixed bottom-0 z-20 w-full bg-gr-700 left-0 text-gray-300 py-4 px-16 border-t border-gray-700">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="flex items-center">
            Agenda de
            <Link href={`/${artistData.username}`}>
              <a className="text-gn-500 ml-2">{artistData.displayName}</a>
            </Link>
            <AiOutlineCalendar className="mx-2 text-xl" />
            {artistData.available_label}
          </div>
          <div className="flex items-center">
            <div className="text-right mr-5">
              <h3 className="text-gray-400">CITAS DISPONIBLES EN</h3>
              <span className="font-semibold">
                {artistData.available_label}
              </span>
            </div>
            <button className="flex bg-gn-500 hover:bg-green-700 px-8 py-3 rounded-md font-semibold text-sm border border-gn-500">
              CONTACTAR <FaWhatsapp className="text-xl ml-3" />
            </button>

            <button
              className="ml-4 flex items-center text-white focus:outline-none"
              onClick={goTop}
            >
              <span className="text-2xl rounded-full bg-gr-800 hover:bg-gr-900 p-3 border border-gr-600">
                <IoIosArrowUp />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostBottomFixed
