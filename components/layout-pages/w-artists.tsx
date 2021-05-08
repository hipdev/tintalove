import { BsSearch } from 'react-icons/bs'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { AiOutlineStar } from 'react-icons/ai'
import { FaInstagram } from 'react-icons/fa'
import { AiFillFacebook } from 'react-icons/ai'
import { AiOutlineTwitter } from 'react-icons/ai'
import { AiOutlineCalendar } from 'react-icons/ai'
import { RiMessengerLine } from 'react-icons/ri'
import { FaWhatsapp } from 'react-icons/fa'
import { HiOutlinePhoneOutgoing } from 'react-icons/hi'
import Card2Artist from 'components/layout-pages/card2-artist'
import CardArtist from 'components/layout-pages/card-artist'

const ArtistLayout = () => {
  return (
    <div className="bg-ocean_blue-900 h-auto">
      <div className="container mx-auto pt-32">
        <div className="flex flex-col sm:flex-col xl:flex-row items-center justify-between mb-10">
          <div className="flex items-center mb-4 xl:mb-0">
            <input
              type="search"
              placeholder="BUSCAR..."
              className="w-64 sm:w-96 h-12 px-5 rounded-l-lg placeholder-black"
            />
            <button
              type="submit"
              className="w-14 h-12 bg-green-500 rounded-r-lg focus:outline-none"
            >
              <span className="text-xl text-white flex justify-center">
                <BsSearch />
              </span>
            </button>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 border border-gray-400 p-3 rounded-md">
              <span className="text-2xl text-gray-300">
                <MdKeyboardArrowDown />
              </span>
              <select
                name=""
                id=""
                className="appearance-none bg-transparent text-gray-300"
              >
                <option value="">ORDENAR POR</option>
              </select>
            </div>
            <div className="flex items-center gap-2 border border-gray-400 p-3 rounded-md">
              <span className="text-2xl text-gray-300">
                <MdKeyboardArrowDown />
              </span>
              <select
                name=""
                id=""
                className="appearance-none bg-transparent text-gray-300"
              >
                <option value="">ESTILOS</option>
              </select>
            </div>
          </div>
        </div>
        <section className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5 pb-20 mx-5 sm:mx-0">
          <CardArtist />
          <CardArtist />
          <CardArtist />
          <CardArtist />
          <CardArtist />
          <CardArtist />
        </section>
      </div>
    </div>
  )
}

export default ArtistLayout
