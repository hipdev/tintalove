import { formatDistanceToNow } from 'date-fns'
import { parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { deletePostComment } from 'lib/queries/posts'
import { url_domain } from 'lib/utils'
import toast from 'react-hot-toast'
import { AiOutlineDelete } from 'react-icons/ai'

const PostComment = ({
  comment,
  userId,
  postId,
  removeComment,
  setTotalComments,
  totalComments,
}) => {
  // const daysGone = differenceInDays(comment.created_at, Date.now())
  // const minutesGone = differenceInMinutes(Date.now(), comment.created_at)

  const distanceGone = formatDistanceToNow(parseISO(comment.created_at), {
    locale: es,
  }).replace('alrededor de', 'Hace')

  const handleDelete = () => {
    toast.promise(deletePostComment(comment.id, postId), {
      loading: 'Eliminando comentario...',
      success: () => {
        removeComment(comment.id)
        setTotalComments(totalComments - 1)

        return 'Comentario eliminado 😉'
      },
      error: (err) => {
        return `${err.toString()}`
      },
    })
  }

  const userImage = url_domain(comment?.user_picture)

  return (
    <div className="w-full flex space-x-4 mb-5 relative group">
      <div className="flex-shrink-0">
        <img
          src={
            comment.users?.photo_info
              ? comment.users?.photo_info?.url +
                '/tr:pr-true,c-at_max,f-auto,w-100,q-50'
              : comment.users?.photo_url ||
                comment.user_picture ||
                '/unuser.png'
          }
          alt="User photo"
          className="rounded-full w-12 h-12 object-cover"
        />
      </div>
      <div>
        <div className="flex items-end">
          <h4 className="text-gray-200 font-raleway font-semibold tracking-wide">
            {comment?.users?.full_name || comment.name}
          </h4>
          <p className="text-light-400 text-xs ml-2 mb-[3px]">{distanceGone}</p>
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
