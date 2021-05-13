import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { deletePostComment } from 'lib/queries/posts'
import toast from 'react-hot-toast'
import { AiOutlineDelete } from 'react-icons/ai'

const PostComment = ({ comment, userId, postId, removeComment }) => {
  // const daysGone = differenceInDays(comment.created_at, Date.now())
  // const minutesGone = differenceInMinutes(Date.now(), comment.created_at)

  const distanceGone = formatDistanceToNow(comment.created_at, {
    locale: es,
  }).replace('alrededor de', 'Hace')

  const handleDelete = () => {
    toast.promise(deletePostComment(comment.id, postId), {
      loading: 'Eliminando comentario...',
      success: () => {
        removeComment(comment.id)

        return 'Comentario eliminado 😉'
      },
      error: (err) => {
        return `${err.toString()}`
      },
    })
  }

  return (
    <div className="w-full flex space-x-4 mb-5 relative group pr-16">
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
          <p className="text-light-400 text-xs ml-2">{distanceGone}</p>
        </div>
        <p className="text-light-200 text-sm mt-1">{comment.comment}</p>
      </div>
      {userId && userId == comment.user_id && (
        <div className="absolute right-4 top-3 hidden group-hover:block cursor-pointer">
          <AiOutlineDelete
            className="text-primary text-2xl"
            title="Eliminar comentario"
            onClick={handleDelete}
          />
        </div>
      )}
    </div>
  )
}

export default PostComment
