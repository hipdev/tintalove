import Link from 'next/link'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { GoSearch } from 'react-icons/go'
import { RiHome4Line } from 'react-icons/ri'

const NavFooter = () => {
  return (
    <nav
      className="flex bg-dark-600 fixed bottom-0 w-full justify-evenly text-gray-200  sm:hidden"
      style={{ boxShadow: '0px -1px 4px #040404' }}
    >
      <Link href="/">
        <a className="text-2xl p-3">
          <RiHome4Line />
        </a>
      </Link>
      <Link href="/">
        <a className="text-2xl p-3">
          <GoSearch />
        </a>
      </Link>
      <button className="text-2xl p-3">
        <AiOutlineUnorderedList />
      </button>
    </nav>
  )
}

export default NavFooter
