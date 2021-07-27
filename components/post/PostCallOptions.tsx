import { useState } from 'react'
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'
import { FiPhoneCall } from 'react-icons/fi'
import { ArtistTypes } from 'types/artist'
import parsePhoneNumber from 'libphonenumber-js'

const WhatsAppButton = ({ artistData }) => (
  <a
    href={`https://api.whatsapp.com/send?phone=${artistData.phone}`}
    target="_blank"
    rel="noreferrer"
    className="flex bg-gn-500 hover:bg-green-700 px-8 py-3 rounded-md font-semibold text-sm border border-gn-500 uppercase"
  >
    Whats App
    <FaWhatsapp className="text-xl ml-3" />
  </a>
)

const DirectCallButton = ({ artistData }) => {
  const [text, setText] = useState('Ver número')

  const phoneNumber = parsePhoneNumber(artistData.phone).formatInternational()

  return (
    <>
      <a
        href={`https://api.whatsapp.com/send?phone=${artistData.phone}`}
        target="_blank"
        rel="noreferrer"
        className="flex sm:hidden bg-gn-500 hover:bg-green-700 px-8 py-3 rounded-md font-semibold text-sm border border-gn-500 uppercase"
      >
        Llamar
        <FaWhatsapp className="text-xl ml-3" />
      </a>

      <button
        className="hidden sm:flex bg-gn-500 hover:bg-green-700 px-8 py-3 rounded-md font-semibold text-sm border border-gn-500 uppercase"
        onClick={() => setText(phoneNumber)}
      >
        {text}
        <FiPhoneCall className="text-xl ml-3" />
      </button>
    </>
  )
}

const TelegramButton = ({ artistData }: { artistData: ArtistTypes }) => (
  <a
    href={`https://t.me/${artistData.telegram_user}`}
    target="_blank"
    rel="noreferrer"
    className="flex bg-gn-500 hover:bg-green-700 px-8 py-3 rounded-md font-semibold text-sm border border-gn-500 uppercase"
  >
    Telegram
    <FaTelegramPlane className="text-xl ml-3" />
  </a>
)

const PostCallOptions = ({ artistData }: { artistData: ArtistTypes }) => {
  return (
    <>
      {artistData.contact_way == 'whatsapp' ? (
        <WhatsAppButton artistData={artistData} />
      ) : artistData.contact_way == 'direct_call' ? (
        <DirectCallButton artistData={artistData} />
      ) : (
        <TelegramButton artistData={artistData} />
      )}
    </>
  )
}

export default PostCallOptions
