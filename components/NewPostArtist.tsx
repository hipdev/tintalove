import {
  BsArrowRight,
  BsArrowUp,
  BsTablet,
  BsTabletLandscape,
} from 'react-icons/bs'
import { CgDice1 } from 'react-icons/cg'

const PostArtist = () => {
  return (
    <div className="bg-dark-800 h-screen px-4 sm:px-16 lg:px-28 overflow-auto pt-10">
      <div className="flex flex-wrap xl:flex-nowrap justify-center xl:justify-start gap-16 xl:gap-24 mt-20">
        <div className="w-11/12 md:w-3/4 xl:w-1/2 h-auto">
          <div className="flex flex-col items-center justify-center w-full h-448 sm:h-609 border-2 border-light-200 border-dashed rounded-md">
            <div className="grid place-items-center w-24 h-24 bg-dark-500 rounded-full mb-5">
              <span className="text-green-500 text-5xl">
                <BsArrowUp />
              </span>
            </div>
            <p className="text-white">JPG, GIF or PNG. Max size of 800K</p>
            <button className="text-white bg-primary hover:bg-primaryHover mt-5 py-3 px-6 rounded-md focus:outline-none">
              Seleccionar Archivo
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center  text-white gap-4 mt-6 lg:mb-0 xl:mb-32">
            <h1 className="w-full md:w-auto tracking-wide">PROPORCIÓN:</h1>
            <button className="w-14 h-14 md:h-0 md:w-48 sm:w-auto flex items-center justify-center gap-3 bg-primary py-6 px-4 rounded-full md:rounded-md hover:bg-primaryHover focus:outline-none">
              <span className="text-2xl">
                <BsTabletLandscape />
              </span>
              <span className="hidden md:block">HORIZONTAL</span>
            </button>
            <button className="w-14 h-14 md:h-0 md:w-48 sm:w-auto flex items-center justify-center gap-3 bg-gr-800 py-6 px-4 rounded-full md:rounded-md focus:outline-none">
              <span className="text-2xl">
                <BsTablet />
              </span>
              <span className="hidden md:block">VERTICAL</span>
            </button>
            <button className="w-14 h-14 md:h-0 md:w-48 sm:w-auto flex items-center justify-center gap-3 bg-gr-800 py-6 px-4 rounded-full md:rounded-md focus:outline-none">
              <span className="text-2xl">
                <CgDice1 />
              </span>
              <span className="hidden md:block">CUADRADA</span>
            </button>
          </div>
        </div>
        <div className="w-11/12 md:w-3/4 xl:w-1/2">
          <h1 className="text-white text-2xl mb-10">Nueva publicación</h1>
          <form action="">
            <div className="w-full flex flex-col mb-8">
              <label htmlFor="titulo" className="text-white mb-2">
                TITULO
              </label>
              <input
                id="titulo"
                type="text"
                placeholder="Agrega un titulo a tu publicación"
                className="w-full placeholder-light-200 bg-gr-800 p-3 rounded-md text-white"
              />
            </div>
            <div className="w-full flex flex-col mb-8">
              <label htmlFor="estilos" className="text-white mb-2">
                ESTILOS
              </label>
              <input
                id="estilos"
                type="text"
                placeholder="En qué estilo está hecho este tatuaje"
                className="w-full placeholder-light-200 bg-gr-800 p-3 rounded-md text-white"
              />
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="descripción" className="text-white mb-2">
                DESCRIPCIÓN
              </label>
              <textarea
                name=""
                id="descripción"
                rows={6}
                placeholder="Cuéntanos más detalles acerca de este tatuaje"
                className="w-full placeholder-light-200 bg-gr-800 p-3 rounded-md resize-none text-white"
              ></textarea>
            </div>
          </form>
          <div className="flex gap-4 sm:gap-8 text-white mt-5 xl:mt-32 ml-5 justify-center mb-5">
            <button className="py-3 px-4 focus:outline-none">CANCELAR</button>
            <button className="flex items-center gap-3 py-3 px-5 sm:px-20 bg-primary hover:bg-primaryHover rounded-md focus:outline-none">
              PUBLICAR
              <span className="text-2xl">
                <BsArrowRight />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostArtist
