import { addComment } from 'lib/queries/posts'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaRegCommentDots } from 'react-icons/fa'
import PostComment from './post-comment'

const PostComments = ({ postId, userData, commentsData }) => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(commentsData)

  console.log(commentsData, 'la data desde getProps')

  const sendComment = () => {
    console.log(comment, 'le diste click a crear un comentario')

    console.log(userData, 'user')
    if (!userData) {
      toast('Ingresa para hacer un comentario')
      return
    }
    if (comment != '') {
      toast.promise(addComment(comment, postId, userData), {
        loading: 'Enviando comentario...',
        success: () => {
          // setLoading(false)
          // setSuccess(true)
          setComments([
            ...comments,
            {
              displayName: userData.displayName,
              created_at: Date.now(),
              comment,
              user_picture: userData.photo,
            },
          ])

          setComment('')

          return 'Comentario añadido 😉'
        },
        error: (err) => {
          // setLoading(false)
          return `${err.toString()}`
        },
      })
    }
  }

  return (
    <div className="mb-4 w-2/3 max-h-96 overflow-hidden overflow-y-auto nice_scroll mr-10">
      <div className="flex justify-center lg:justify-start gap-2 mb-5">
        <input
          type="text"
          value={comment}
          placeholder="Escribe algo..."
          className="w-3/5 bg-ocean_blue-200 border border-light-700 px-5 py-3 rounded-lg focus:outline-none text-gray-300"
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="flex items-center gap-2 btn-primary px-4 py-3"
          onClick={sendComment}
        >
          <span className="text-xl">
            <FaRegCommentDots />
          </span>
          Comentar
        </button>
      </div>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <PostComment key={comment.id} comment={comment} />
        ))
      ) : (
        <p className="text-gray-300">Sin comentarios</p>
      )}
    </div>
  )
}

export default PostComments
