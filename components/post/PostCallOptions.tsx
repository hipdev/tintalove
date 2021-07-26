import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'
import { FiPhoneCall } from 'react-icons/fi'
import { ArtistTypes } from 'types/artist'

const PostCallOptions = ({ artistData }: { artistData: ArtistTypes }) => {
  console.log(artistData, 'data artist')
  return (
    <a
      href={
        artistData.contact_way == 'whatsapp'
          ? `https://api.whatsapp.com/send?phone=${artistData.phone}`
          : artistData.contact_way == 'direct_call'
          ? `https://api.whatsapp.com/send?phone=${artistData.phone}`
          : `https://api.whatsapp.com/send?phone=${artistData.phone}`
      }
      target="_blank"
      rel="noreferrer"
      className="flex bg-gn-500 hover:bg-green-700 px-8 py-3 rounded-md font-semibold text-sm border border-gn-500"
    >
      CONTACTAR{' '}
      {artistData.contact_way == 'whatsapp' ? (
        <FaWhatsapp className="text-xl ml-3" />
      ) : artistData.contact_way == 'direct_call' ? (
        <FiPhoneCall className="text-xl ml-3" />
      ) : (
        <FaTelegramPlane className="text-xl ml-3" />
      )}
    </a>
  )
}

export default PostCallOptions
