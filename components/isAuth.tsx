
import { useUser } from 'hooks/useUser'
import Loading from './loading/loading'

export default function IsAuth({ children }) {
  const { user }: any = useUser()

  if (user) {
    return children
  } else {
    return (
      <div className="h-screen flex items-center justify-center bg-dark-800">
        <Loading />
      </div>
    )
  }
}
