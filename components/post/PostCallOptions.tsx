import { useState } from 'react'
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'
import { FiPhoneCall } from 'react-icons/fi'
import { ArtistTypes } from 'types/artist'
import parsePhoneNumber from 'libphonenumber-js'
import { StudioTypes } from 'types/studio'

const WhatsAppButton = ({ artistData, widthFull }) => (
  <a
    href={`https://api.whatsapp.com/send?phone=${artistData.phone}`}
    target="_blank"
    rel="noreferrer"
    className={
      'flex bg-gn-500 hover:bg-green-700 px-8 py-3 rounded-md font-semibold text-sm border border-gn-500 uppercase justify-center text-gray-200 ' +
      (widthFull ? ' w-full' : '')
    }
  >
    Whats App
    <FaWhatsapp className="text-xl ml-3" />
  </a>
)

const DirectCallButton = ({ artistData, widthFull }) => {
  const [text, setText] = useState('Ver número')

  const phoneNumber = parsePhoneNumber(artistData.phone).formatInternational()

  return (
    <>
      <a
        href={`tel:${artistData.phone}`}
        target="_blank"
        rel="noreferrer"
        className={
          'flex sm:hidden bg-gn-500 hover:bg-green-700 px-8 py-3 rounded-md font-semibold text-sm border border-gn-500 uppercase justify-center text-gray-200 w-full' +
          (widthFull ? ' w-full' : '')
        }
      >
        Llamar
        <FaWhatsapp className="text-xl ml-3" />
      </a>

      <button
        className={
          'hidden sm:flex bg-gn-500 hover:bg-green-700 px-8 py-3 rounded-md font-semibold text-sm border border-gn-500 uppercase justify-center text-gray-200 ' +
          (widthFull ? ' w-full' : '')
        }
        onClick={() => setText(phoneNumber)}
      >
        {text}
        <FiPhoneCall className="text-xl ml-3" />
      </button>
    </>
  )
}

const TelegramButton = ({ artistData, widthFull }) => (
  <a
    href={`https://t.me/${artistData.telegram_user}`}
    target="_blank"
    rel="noreferrer"
    className={
      'flex bg-gn-500 hover:bg-green-700 px-8 py-3 rounded-md font-semibold text-sm border border-gn-500 uppercase justify-center text-gray-200 ' +
      (widthFull ? ' w-full' : '')
    }
  >
    Telegram
    <FaTelegramPlane className="text-xl ml-3" />
  </a>
)

const PostCallOptions = ({
  artistData,
  widthFull,
}: {
  artistData: ArtistTypes | StudioTypes
  widthFull?: boolean
}) => {
  return (
    <>
      {artistData.contact_way == 'whatsapp' ? (
        <WhatsAppButton artistData={artistData} widthFull={widthFull} />
      ) : artistData.contact_way == 'direct_call' ? (
        <DirectCallButton artistData={artistData} widthFull={widthFull} />
      ) : artistData.contact_way == 'telegram' ? (
        <TelegramButton artistData={artistData} widthFull={widthFull} />
      ) : (
        <button
          className={
            'bg-gn-500 hover:bg-green-700 px-8 py-3 rounded-md font-semibold text-sm border border-gn-500 uppercase justify-center text-gray-200 ' +
            (widthFull ? ' w-full' : '')
          }
        >
          Sin Asignar
        </button>
      )}
    </>
  )
}

export default PostCallOptions
