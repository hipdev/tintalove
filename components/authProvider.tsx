import { useUserData } from "../lib/hooks";

const AuthProvider = ({ children }) => {
  const userData: any = useUserData();

  return <>{children}</>;
};

export default AuthProvider;
