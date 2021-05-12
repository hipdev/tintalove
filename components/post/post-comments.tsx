import { FaRegCommentDots } from 'react-icons/fa'
import PostComment from './post-comment'

const PostComments = () => {
  return (
    <div className="mb-4 w-2/3">
      <div className="flex justify-center lg:justify-start gap-2 mb-5">
        <input
          type="text"
          placeholder="Escribe algo..."
          className="w-3/5 bg-ocean_blue-200 border border-light-700 px-5 py-3 rounded-lg focus:outline-none text-gray-300"
        />
        <button className="flex items-center gap-2 btn-primary px-4 py-3">
          <span className="text-xl">
            <FaRegCommentDots />
          </span>
          Comentar
        </button>
      </div>

      <PostComment />
      <PostComment />
      <PostComment />
    </div>
  )
}

export default PostComments
