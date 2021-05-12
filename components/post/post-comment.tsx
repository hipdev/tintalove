import {
  // differenceInDays,
  // differenceInMinutes,
  formatDistanceToNow,
} from 'date-fns'
import { es } from 'date-fns/locale'

const PostComment = ({ comment }) => {
  // const daysGone = differenceInDays(comment.created_at, Date.now())
  // const minutesGone = differenceInMinutes(Date.now(), comment.created_at)
  const distanceGone = formatDistanceToNow(comment.created_at, {
    locale: es,
  }).replace('alrededor de', 'Hace')

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
          <p className="text-light-400 text-xs ml-2">{distanceGone}</p>
        </div>
        <p className="text-light-200 text-sm mt-1">{comment.comment}</p>
      </div>
    </div>
  )
}

export default PostComment
