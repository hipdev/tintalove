import Link from "next/link";

const Header = () => {
  return (
    <nav className="w-full h-auto flex flex-col lg:flex-row px-2 sm:px-20 md:px-40 py-4 bg-dark-700">
      <div className="w-auto flex flex-wrap justify-evenly items-center">
        <div className="w-176 mb-1">
          <Link href="">
            <a className="flex items-center">
              <div className="w-10 h-10 bg-red-600 rounded-full"></div>
              <h1 className="text-white text-3xl font-bold font-raleway absolute ml-2">
                Tintalovers
              </h1>
            </a>
          </Link>
        </div>
        <div className="w-full md:w-99 flex flex-wrap justify-evenly mb-2 lg:mb-0">
          <Link href="">
            <a className="text-white">Tatuajes</a>
          </Link>
          <Link href="">
            <a className="text-white">Artistas</a>
          </Link>
          <Link href="">
            <a className="text-white">Nosotros</a>
          </Link>
          <Link href="">
            <a className="text-white">Soy un artista</a>
          </Link>
        </div>
        <div className="w-auto lg:w-800 flex flex-shrink flex-col sm:flex-row justify-around xl:justify-between">
          <div className="w-auto flex mr-0 sm:mr-2 lg:mr-0 mb-2 sm:mb-0">
            <input
              type="text"
              value="Tribales"
              className="w-full lg:w-96 xl:w-97 p-3 rounded-l-lg focus:outline-none"
            />
            <button
              type="submit"
              className="text-white bg-red-600 px-5 py-3 rounded-r-lg focus:outline-none"
            >
              Buscar
            </button>
          </div>
          <button className="w-1/2 sm:w-auto text-white border border-white px-5 py-3 mx-auto sm:mx-0 rounded-lg focus:outline-none">
            Ingresar
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
