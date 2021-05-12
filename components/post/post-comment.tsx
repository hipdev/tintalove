const PostComment = ({ comment }) => {
  return (
    <div className="w-4/5 flex space-x-4 mb-5">
      <div className="flex-shrink-0">
        <img
          src={comment.user_picture}
          alt=""
          className="rounded-full w-12 object-cover"
        />
      </div>
      <div>
        <div className="flex items-end ">
          <h4 className="text-gray-200 font-raleway font-semibold tracking-wide">
            {comment.displayName}{' '}
          </h4>
          <p className="text-light-400 text-xs ml-2">24 de marzo</p>
        </div>
        <p className="text-light-200 text-sm mt-1">{comment.comment}</p>
      </div>
    </div>
  )
}

export default PostComment
