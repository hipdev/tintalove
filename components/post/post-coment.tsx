const PostComment = () => {
  return (
    <div className="w-4/5 flex space-x-4 mb-3">
      <div className="flex-shrink-0">
        <img
          src="https://via.placeholder.com/45x45"
          alt=""
          className="rounded-lg"
        />
      </div>
      <div>
        <div>
          <h4 className="text-white font-raleway font-semibold tracking-wide">
            Daniel Castillo
          </h4>
          <p className="text-light-400 text-xs">24 de Marzo</p>
        </div>
        <p className="text-light-200 text-sm">
          Que nota de tatuaje!, esta muy bien hecho
        </p>
      </div>
    </div>
  )
}

export default PostComment
