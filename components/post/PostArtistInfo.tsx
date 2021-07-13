import { ArtistTypes } from 'types/artist'
import Link from 'next/link'
import { FiPhoneCall } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'

const PostArtistInfo = ({ artistData }: { artistData: ArtistTypes }) => {
  console.log(artistData, 'data Artist')

  return (
    <div className="bg-dark-800 text-gray-200 px-4 py-4 mb-10 rounded-sm">
      <div className="flex justify-between">
        <div className="flex">
          <Link href={`/${artistData.username}`}>
            <a>
              <img
                src={artistData?.profile_picture.url}
                className="w-12 h-12 rounded-full"
              />
            </a>
          </Link>
          <div className="flex flex-col ml-5">
            <Link href={`/${artistData.username}`}>
              <a className="text-xl">{artistData.displayName}</a>
            </Link>
            <span className="text-sm text-gray-400">{`${artistData.city_name}, ${artistData.province}`}</span>
          </div>
        </div>
        <div className="flex items-start">
          <button className="bg-rd-400 hover:bg-rd-300 text-2xl p-2 rounded-full mr-2">
            <AiOutlineHeart />
          </button>
          <a
            href={`tel:${artistData.phone}`}
            className="bg-gn-400 hover:bg-gn-300 text-2xl p-2 rounded-full inline-block"
          >
            <FiPhoneCall />
          </a>
        </div>
      </div>
      <div className="h-[2px] w-full bg-gray-800 mt-2"></div>
      <h3 className="mt-2 text-lg text-gray-400 font-semibold">
        Agenda:{' '}
        <span className="font-normal text-gray-200 ml-1">
          {artistData.available_label}
        </span>{' '}
      </h3>
    </div>
  )
}

export default PostArtistInfo
