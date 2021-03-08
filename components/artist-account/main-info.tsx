import SideMenu from './side-menu'

const MainInfo = () => {
  return (
    <div className="w-full h-auto lg:h-screen  bg-gradient-to-r from-dark-700   to-black">
      <div className="h-full flex flex-col">
        <div className="h-full flex flex-col lg:flex-row justify-evenly items-center">
          <SideMenu />

          <div className="relative w-10/12 sm:w-2/3 h-auto bg-dark-700 bg-opacity-50 rounded-xl p-6 sm:p-12 mb-10 lg:mb-0">
            <div>
              <h1 className="text-white text-xl sm:text-2xl font-bold text-center sm:text-left tracking-wide mb-10">
                Información personal
              </h1>
              <form action="">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 md:col-span-3">
                    <label
                      htmlFor=""
                      className="block text-white text-sm uppercase mb-3 tracking-wide"
                    >
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre público"
                      className="w-full bg-transparent border-2 border-light-900 p-2 rounded-xl placeholder-light-900 outline-none"
                    />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label
                      htmlFor=""
                      className="block text-white text-sm uppercase mb-3 tracking-wide"
                    >
                      Ubicación
                    </label>
                    <select
                      name=""
                      id=""
                      className="block w-full bg-transparent border-2 border-light-900 text-white p-2 rounded-xl placeholder-light-900 outline-none"
                    >
                      <option value="" selected>
                        Selecciona
                      </option>
                    </select>
                  </div>
                  <div className="col-span-6 mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <label
                        htmlFor=""
                        className="block text-white text-sm uppercase tracking-wide"
                      >
                        biografia
                      </label>
                      <span className="text-white">0/500</span>
                    </div>
                    <textarea
                      name=""
                      id=""
                      rows={6}
                      placeholder="Cuentale a tus clientes un poco sobre ti"
                      className="w-full bg-transparent border-2 border-light-900 p-2 rounded-xl placeholder-light-900 outline-none resize-none"
                    ></textarea>
                  </div>
                </div>
              </form>
              <button className="block absolute right-10 -bottom-5 btn-red py-3 px-5">
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainInfo
