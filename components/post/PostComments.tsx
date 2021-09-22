import useOnclickOutside from 'react-cool-onclickoutside'
import { addComment } from 'lib/queries/posts'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { FaRegCommentDots } from 'react-icons/fa'
import PostComment from './PostComment'
import { useWindowSize } from 'hooks/useWindowSize'

const PostComments = ({
  postId,
  user,
  commentsData,
  artistData,
  setTotalComments,
  totalComments,
  imageHeight,
}) => {
  const [comment, setComment] = useState('')
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState(commentsData)
  const [loading, setLoading] = useState(false)
  const [showInput, setShowInput] = useState(false)

  const [wSize, setWSize]: any = useState()

  const windowSize = useWindowSize()

  const refClickOutside = useOnclickOutside(() => {
    setShowInput(false)
  })

  const commentBoxRef = useRef(null)

  const removeComment = (commentId) => {
    let filteredArray = comments.filter((comment) => comment.id !== commentId)
    setComments(filteredArray)
  }

  useEffect(() => {
    setComments(commentsData)
  }, [commentsData])

  useEffect(() => {
    setWSize(windowSize.width)
  }, [windowSize])

  const sendComment = (e) => {
    e.preventDefault()
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
              name: user.full_name,
              created_at: data.created_at,
              comment,
              user_id: user.id,
              id: data.id,
              user_picture: user?.photo_info?.url || user.photo_url,
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

  console.log(commentsData, 'los comments')

  return (
    <div className="w-full">
      <div className="w-full flex flex-shrink mb-5">
        <div className="w-16 flex items-center">
          <Link href="#">
            <a className="flex flex-shrink-0 mr-3">
              <img
                // src="https://via.placeholder.com/45x45"
                src={
                  user?.photo_info
                    ? user?.photo_info?.url +
                      '/tr:pr-true,c-at_max,f-auto,w-100,q-50'
                    : user?.photo_url || '/unuser.png'
                }
                className="object-cover w-12 h-12 rounded-full overflow-hidden"
                title="user-image"
                alt="user image"
              />
            </a>
          </Link>
        </div>
        <form className={showInput ? 'flex w-full' : 'w-full'}>
          <input
            ref={refClickOutside}
            type="text"
            value={comment}
            onClick={() => setShowInput(true)}
            onFocus={() => setShowInput(true)}
            placeholder="Escribe un comentario..."
            className="w-full bg-gr-800 border border-light-700 px-5 py-3 rounded-lg text-gray-300 flex-shrink truncate "
            onChange={(e) => setComment(e.target.value)}
          />
          {showInput && (
            <button
              style={{ position: 'relative', right: '2px' }}
              ref={refClickOutside}
              className="flex items-center justify-center bg-green-400 hover:bg-primaryHover  rounded-r-lg px-3"
              onClick={sendComment}
              disabled={loading}
            >
              {!loading && <FaRegCommentDots className="text-xl text-gr-100" />}

              {loading && (
                <svg
                  className="block animate-spin   h-5 w-5 text-white"
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
              {/* <span className="hidden xl:block text-gray-300">
                {loading ? 'Enviando...' : ''}
              </span> */}
            </button>
          )}
        </form>
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
        style={{
          height: `${imageHeight - (wSize <= 639 ? 150 : 320)}px`,
        }}
        className={
          'mb-4 w-full overflow-y-auto nice_scroll mr-10 sm:block ' +
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
