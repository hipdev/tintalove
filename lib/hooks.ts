import { auth } from "./firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { useStateMachine } from "little-state-machine";
import { login, getUser } from "lib/actions";

export function useUserData() {
  const [userInfo, setUserInfo] = useState(null);
  const { state }: any = useStateMachine({
    login,
  });
  const { state2, actions }: any = useStateMachine({
    getUser,
  });

  useEffect(() => {
    const authSubs = onAuthStateChanged(auth, (user: User) => {
      if (user) {
        console.log(user, "mi user");
        user
          .getIdTokenResult()
          .then(({ claims }) => console.log(claims, "los tokens"));
        setUserInfo(user.providerData[0]);
        actions.getUser({
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
          photo: user.photoURL,
        });
      } else {
        actions.getUser(null);
        // console.log(user, "sin user");
      }
    });
    return authSubs();
  }, [state.login]);

  // console.log(userInfo, "data");
  return { user: userInfo };
}
