import { addComment } from 'lib/queries/posts'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaRegCommentDots } from 'react-icons/fa'
import PostComment from './post-comment'

const PostComments = ({
  postId,
  userData,
  commentsData,
  setTotalComments,
  totalComments,
}) => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(commentsData)
  const [loading, setLoading] = useState(false)

  const removeComment = (commentId) => {
    let filteredArray = comments.filter((comment) => comment.id !== commentId)
    setComments(filteredArray)
  }

  const sendComment = () => {
    setLoading(true)

    if (!userData) {
      toast('Ingresa para hacer un comentario')
      setLoading(false)
      return
    }
    if (comment != '') {
      toast.promise(addComment(comment, postId, userData), {
        loading: 'Enviando comentario...',
        success: (data: any) => {
          setComments([
            {
              displayName: userData.displayName,
              created_at: Date.now(),
              comment,
              user_id: userData.uid,
              id: data.commentId,
              user_picture: userData.photo,
            },
            ...comments,
          ])
          setTotalComments(totalComments + 1)

          setComment('')
          setLoading(false)

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
      <div className="flex justify-center lg:justify-start gap-2 mb-5">
        <Link href="#">
          <a className="flex flex-shrink-0">
            <img
              // src="https://via.placeholder.com/45x45"
              src={
                userData?.profile_picture?.url
                  ? `${userData.profile_picture.url}/tr:pr-true,c-at_max,f-auto,q-100,w-80`
                  : 'https://via.placeholder.com/45x45'
              }
              className="object-cover w-12 h-12 rounded-md overflow-hidden"
            />
          </a>
        </Link>
        <input
          type="text"
          value={comment}
          placeholder="Escribe un comentario..."
          className="w-full bg-ocean_blue-300 border border-light-700 px-5 py-3 rounded-lg focus:outline-none text-gray-300"
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="flex items-center gap-2 btn-primary px-4 py-1"
          onClick={sendComment}
          disabled={loading}
        >
          {!loading && <FaRegCommentDots className="text-xl" />}

          {loading && (
            <svg
              className="animate-spin  ml-3 h-5 w-5 text-white"
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
          {loading ? 'Enviando...' : 'Comentar'}
        </button>
      </div>
      <div className="mb-4 w-full max-h-96 overflow-hidden overflow-y-auto nice_scroll mr-10">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <PostComment
              key={comment.id}
              comment={comment}
              userId={userData?.uid || null}
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
