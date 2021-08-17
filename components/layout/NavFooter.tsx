import { useStateMachine } from 'little-state-machine'
import Link from 'next/link'
import { AiOutlineHeart, AiOutlineUnorderedList } from 'react-icons/ai'
import { lists } from 'lib/actions'
import { BiHomeSmile, BiSearch } from 'react-icons/bi'

const NavFooter = () => {
  const { _, actions }: any = useStateMachine({
    lists,
  })

  return (
    <nav
      className="flex bg-dark-800 fixed bottom-0 w-full justify-evenly text-gray-300  sm:hidden"
      style={{ boxShadow: '0px -1px 4px #040404' }}
    >
      <Link href="/">
        <a className="p-3 flex flex-col items-center">
          <BiHomeSmile className="text-xl" />
          <span className="text-xs">INICIO</span>
        </a>
      </Link>
      <Link href="/">
      <a className="p-3 flex flex-col items-center">
          <BiSearch className="text-xl" />
          <span className="text-xs">BUSCAR</span>
        </a>
      </Link>
      <button
        className=" p-3 focus:outline-none flex flex-col items-center" 
        onClick={() => actions.lists({ post: null, listOpen: true })}
      >
        <AiOutlineHeart className="text-xl" />
        <span className="text-xs">FAVORITOS</span>

      </button>
    </nav>
  )
}

export default NavFooter
