import useOnclickOutside from 'react-cool-onclickoutside'
import { addComment } from 'lib/queries/posts'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { FaRegCommentDots } from 'react-icons/fa'
import PostComment from './PostComment'

const PostComments = ({
  postId,
  user,
  commentsData,
  setTotalComments,
  totalComments,
}) => {
  const [comment, setComment] = useState('')
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState(commentsData)
  const [loading, setLoading] = useState(false)
  const [showInput, setShowInput] = useState(false)

  const refClickOutside = useOnclickOutside(() => {
    setShowInput(false)
  })

  const handleClickBtn = () => {
    setShowInput(!showInput)
  }

  const commentBoxRef = useRef(null)

  const removeComment = (commentId) => {
    let filteredArray = comments.filter((comment) => comment.id !== commentId)
    setComments(filteredArray)
  }
  useEffect(() => {
    setComments(commentsData)
  }, [commentsData])

  const sendComment = () => {
    setLoading(true)

    if (!user) {
      toast('Ingresa para hacer un comentario')
      setLoading(false)
      return
    }
    if (comment != '') {
      toast.promise(addComment(comment, postId, user), {
        loading: 'Enviando comentario...',
        success: (data: any) => {
          console.log(data, 'el comentario creado')
          setComments([
            {
              displayName: user.displayName,
              created_at: Date.now(),
              comment,
              user_id: user.uid,
              id: data.commentId,
              user_picture: user.photoUrl,
            },
            ...comments,
          ])
          setTotalComments(totalComments + 1)

          setComment('')
          setLoading(false)
          commentBoxRef.current.scrollTop = 0

          return 'Comentario añadido 😉'
        },
        error: (err) => {
          setLoading(false)
          return `${err.toString()}`
        },
      })
    } else {
      toast('Debes escribir un comentario')
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="w-full flex flex-shrink mb-5">
        <div className="w-16 flex items-center">
          <Link href="#">
            <a className="flex flex-shrink-0 mr-3">
              <img
                // src="https://via.placeholder.com/45x45"
                src={
                  user?.photoUrl
                    ? `${user.photoUrl}`
                    : 'https://via.placeholder.com/45x45'
                }
                className="object-cover w-12 h-12 rounded-full overflow-hidden"
                title="user-image"
              />
            </a>
          </Link>
        </div>
        <div className={showInput ? 'flex' : 'w-full'}>
          <input
            ref={refClickOutside}
            autoFocus
            type="text"
            value={comment}
            onClick={() => setShowInput(true)}
            placeholder="Escribe un comentario..."
            className="w-full bg-ocean_blue-300 border border-light-700 px-5 py-3 rounded-l-lg focus:outline-none text-gray-300 flex-shrink truncate focus:border focus:border-gn-300"
            onChange={(e) => setComment(e.target.value)}
          />
          {showInput && (
            <button
              className="flex items-center bg-green-400 hover:bg-primaryHover px-4 rounded-r-lg"
              onClick={sendComment}
              disabled={loading}
            >
              {!loading && <FaRegCommentDots className="text-xl text-gr-100" />}

              {loading && (
                <svg
                  className="block animate-spin  ml-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              <span className="hidden xl:block">
                {loading ? 'Enviando...' : ''}
              </span>
            </button>
          )}
        </div>
      </div>

      <div className={showComments ? 'hidden' : 'block'}>
        <div className="flex justify-end mb-4 mr-2 sm:hidden">
          <button
            onClick={() => setShowComments(true)}
            className="text-gray-300"
          >
            Ver comentarios
          </button>
        </div>
      </div>
      <div
        ref={commentBoxRef}
        className={
          'mb-4 w-full overflow-hidden overflow-y-auto nice_scroll mr-10 sm:block ' +
          (showComments ? 'block' : 'hidden')
        }
      >
        {comments.length > 0 ? (
          comments.map((comment) => (
            <PostComment
              key={comment.id}
              comment={comment}
              userId={user?.uid || null}
              postId={postId}
              removeComment={removeComment}
              setTotalComments={setTotalComments}
              totalComments={totalComments}
            />
          ))
        ) : (
          <p className="text-gray-300">Sin comentarios</p>
        )}
      </div>
    </div>
  )
}

export default PostComments
