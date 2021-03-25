import { useUserData } from 'hooks/use-user-data'

const AuthProvider = ({ children }) => {
  useUserData()

  return <>{children}</>
}

export default AuthProvider
