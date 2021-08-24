import useUserId from 'hooks/use-user-id'
import Loading from './loading/loading'

export default function IsAuth({ children }) {
  const { userId } = useUserId()

  if (userId) {
    return children
  } else {
    return (
      <div className="h-screen flex items-center justify-center bg-dark-800">
        <Loading />
      </div>
    )
  }
}
