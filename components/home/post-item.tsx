import Link from 'next/link'

import { FaRegCommentDots } from 'react-icons/fa'
import { RiHeartLine } from 'react-icons/ri'

const PostItem = ({ post }) => {
  return (
    <div>
      <img
        // src="https://via.placeholder.com/309x234"
        src={
          post?.image?.url
            ? `${post.image.url}/tr:pr-true,c-at_max,f-auto,h-235,q-100`
            : 'https://via.placeholder.com/309x234'
        }
        alt=""
        className="w-full rounded-sm  object-cover"
      />
      <div className="flex justify-between mt-2">
        <div className="flex items-center space-x-2">
          <img
            src={`${post.artist_picture}/tr:pr-true,c-at_max,f-auto,h-32,q-100`}
            className="w-7 h-7 bg-primary rounded-full"
          />
          <p className="text-white text-sm">
            {post.displayName || 'Sin nombre'}
          </p>
        </div>
        <div className="flex space-x-5">
          <div className="flex items-center space-x-2 text-white">
            <p className="">10</p>
            <span>
              <FaRegCommentDots />
            </span>
          </div>
          <div className="flex items-center space-x-2 text-white">
            <p className="">53</p>
            <span>
              <RiHeartLine />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem
