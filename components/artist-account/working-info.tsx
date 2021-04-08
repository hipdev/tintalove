import SideMenu from './side-menu'
import Link from 'next/link'

type Props = {
  isArtist: boolean
}

const WorkingInfo = ({ isArtist }: Props) => {
  console.log(isArtist, 'es un artista')
  return (
    <div className="w-full h-auto bg-gradient-to-r from-dark-700 to-black 2xl:h-screen pt-10 2xl:pt-0">
      <div className="h-full flex flex-col">
        <div className="h-full flex flex-col lg:flex-row justify-evenly items-center">
          <SideMenu />

          <div
            style={{ boxShadow: '1px 0px 5px #000' }}
            className="relative w-10/12 sm:w-2/3  bg-dark-700 bg-opacity-50 rounded-xl p-6 sm:p-12 mb-10 lg:mb-0 h-auto"
          >
            <div>
              <h1 className="text-white text-xl sm:text-2xl font-bold text-center sm:text-left tracking-wide mb-10">
                Información Laboral
              </h1>
              <form action="">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 lg:col-span-5 xl:col-span-3">
                    <label
                      htmlFor=""
                      className="block text-white text-sm uppercase mb-3 tracking-wide"
                    >
                      Estilos
                    </label>
                    <select
                      name=""
                      id=""
                      className="block w-full bg-transparent border-2 border-light-900 text-white p-2 rounded-xl placeholder-light-900 outline-none"
                    >
                      <option value="" selected>
                        Selecciona tus especializaciones
                      </option>
                    </select>
                  </div>
                  <div className="col-span-6 lg:col-span-5 xl:col-span-3">
                    <label
                      htmlFor=""
                      className="block text-white text-sm uppercase mb-3 tracking-wide"
                    >
                      Estudio donde trabajas
                    </label>
                    <select
                      name=""
                      id=""
                      className="block w-full bg-transparent border-2 border-light-900 text-white p-2 rounded-xl placeholder-light-900 outline-none"
                    >
                      <option value="" selected>
                        Buscar estudio...
                      </option>
                    </select>
                  </div>
                  <div className="col-span-6 mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <label
                        htmlFor=""
                        className="block text-white text-sm uppercase tracking-wide"
                      >
                        Horarios
                      </label>
                      <span className="text-white">0/100</span>
                    </div>
                    <textarea
                      name=""
                      id=""
                      rows={6}
                      placeholder="Ej. Lunes a viernes, de 10am - 7pm&#10;Sábados, Domingos y Festivos&#10;10:00am 1:00pm"
                      className="w-full bg-transparent border-2 border-light-900 p-2 rounded-xl placeholder-light-900 outline-none resize-none"
                    ></textarea>
                  </div>
                </div>
              </form>

              {!isArtist && (
                <p className="text-white">
                  Para poder completar este paso debes completar la Información
                  personal
                </p>
              )}
              {isArtist ? (
                <button className="block absolute right-10 -bottom-5 btn-red py-3 px-5">
                  Siguiente
                </button>
              ) : (
                <Link href="/artist/main-info">
                  <button className="block absolute right-10 -bottom-5 btn-red py-3 px-5">
                    Ir al paso 1
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkingInfo
