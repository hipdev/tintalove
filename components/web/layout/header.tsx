import { GoSearch } from "react-icons/go";
import Link from "next/link";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { signOut } from "firebase/auth";
import { auth } from "lib/firebase";
import { createUser } from "lib/db";
import { useStateMachine } from "little-state-machine";
import { getUser, login } from "lib/actions";

const provider = new GoogleAuthProvider();

const Header = () => {
  const { state }: any = useStateMachine({
    getUser,
  });
  const { state: loginState, actions } = useStateMachine({
    login,
  });

  const { user } = state;
  console.log(user, "el user");

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        actions.login(null);
      })
      .catch((error) => console.log(error, "error cerrando sesión"));
  };
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        actions.login(true);
        const user = result.user;
        createUser(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
      });
  };

  return (
    <nav className="flex flex-col lg:flex-row px-2 sm:px-20 py-4 bg-dark-700">
      <div className="w-full flex flex-wrap justify-center lg:justify-between items-center">
        <div className="flex flex-wrap justify-center items-center">
          <div className="mb-1">
            <Link href="/">
              <a className="relative flex items-center">
                <div className="absolute top-0 left-16 w-10 h-10 bg-red-600 rounded-full z-0"></div>
                <h1 className="text-white text-3xl font-bold font-raleway ml-2 z-10">
                  Tintalovers
                </h1>
              </a>
            </Link>
          </div>
          <div className="w-full md:w-96 flex flex-wrap justify-evenly mb-2 lg:mb-0 py-4 md:py-0">
            <Link href="/">
              <a className="text-white">Tatuajes</a>
            </Link>
            <Link href="/">
              <a className="text-white">Artistas</a>
            </Link>
            <Link href="/">
              <a className="text-white">Soy un artista</a>
            </Link>
          </div>
        </div>

        <div className="flex items-center">
          <span className="text-lg text-white">
            <GoSearch />
          </span>
          {!user && (
            <>
              <button
                onClick={handleLogin}
                className="w-1/2 sm:w-auto text-white px-6 py-3 mx-auto sm:mx-0 rounded-lg focus:outline-none"
              >
                Ingresar
              </button>
              <button className="btn-red px-5 py-3">Registrate</button>
            </>
          )}
          {user && (
            <>
              <a>Perfil</a>
              <button
                className="w-1/2 sm:w-auto text-white px-6 py-3 mx-auto sm:mx-0 rounded-lg focus:outline-none"
                onClick={handleLogout}
              >
                Salir
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
