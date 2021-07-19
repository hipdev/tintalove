import Link from 'next/link'
import { AiOutlineCalendar } from 'react-icons/ai'
import { ArtistTypes } from 'types/artist'

const PostBottomFixed = ({ artistData }: { artistData: ArtistTypes }) => {
  return (
    <div className="fixed bottom-0 z-20 w-full bg-dark-800 left-0 text-gray-300 py-3">
      <div className="container mx-auto">
        <div className="flex justify-around">
          <div className="flex items-center">
            Agenda de
            <Link href={`/${artistData.username}`}>
              <a className="text-gn-500 ml-2">{artistData.displayName}</a>
            </Link>
            <AiOutlineCalendar className="mx-2 text-xl" />
            {artistData.available_label}
          </div>
          <div>Llamar</div>
        </div>
      </div>
    </div>
  )
}

export default PostBottomFixed
