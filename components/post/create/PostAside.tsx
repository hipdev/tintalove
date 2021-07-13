import { FaRegCommentDots } from 'react-icons/fa'
import { RiHeartLine } from 'react-icons/ri'
import { FiSend } from 'react-icons/fi'
import StickyBox from 'react-sticky-box'
import { useState } from 'react'

const PostAside = (postData) => {
  const [totalComments, setTotalComments] = useState(
    postData.counter_comments || 0
  )

  return (
    <div>
      <StickyBox offsetTop={0} offsetBottom={30}>
        <aside className="z-10 ml-4">
          <button className="block mb-2">
            <div className="flex flex-col justify-center items-center w-14 h-14 bg-ocean_blue-300 rounded-lg">
              <span className="text-2xl text-green-500">
                <RiHeartLine />
              </span>
              <p className="text-xs text-white font-raleway">74</p>
            </div>
            <p className="text-atomico text-white tracking-wide">ME GUSTA</p>
          </button>
          <button className="block mb-2">
            <div className="flex flex-col justify-center items-center w-14 h-14 bg-ocean_blue-300 rounded-lg">
              <span className="text-2xl text-green-500">
                <FaRegCommentDots />
              </span>
              <p className="text-xs text-white font-raleway">{totalComments}</p>
            </div>
            <p className="text-atomico text-white tracking-wide">COMENTAR</p>
          </button>
          <button className="block mb-2">
            <div className="flex flex-col justify-center items-center w-14 h-14 bg-ocean_blue-300 rounded-lg">
              <span className="text-2xl text-green-500">
                <FiSend />
              </span>
            </div>
            <p className="text-atomico text-white tracking-wide">COMPARTIR</p>
          </button>
        </aside>
      </StickyBox>
    </div>
  )
}

export default PostAside
