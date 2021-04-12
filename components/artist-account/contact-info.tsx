import SideMenu from './side-menu-artist'

const ContactInfo = () => {
  return (
    <div className="w-full h-auto lg:h-screen overflow-auto bg-gradient-to-r from-dark-700   to-black">
      <div className="h-full flex flex-col">
        <div className="h-full flex flex-col lg:flex-row justify-evenly items-center">
          <SideMenu />
          <div className="relative w-10/12 sm:w-2/3 h-auto bg-dark-700 bg-opacity-50 rounded-xl p-6 sm:p-12 mb-10 lg:mb-0">
            <div>
              <h1 className="text-white text-lg sm:text-2xl font-bold text-center sm:text-left tracking-wide mb-10">
                Información De Contacto
              </h1>
              <form action="">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 lg:col-span-4 xl:col-span-3">
                    <label
                      htmlFor=""
                      className="block text-white text-sm uppercase mb-3 tracking-wide"
                    >
                      Por dónde quieres que te contacten
                    </label>
                    <select
                      name=""
                      id=""
                      className="block w-full bg-transparent border-2 border-light-900 text-white p-2 rounded-xl placeholder-light-900 outline-none"
                    >
                      <option value="" selected>
                        Whatsapp
                      </option>
                    </select>
                  </div>
                  <div className="col-span-6 lg:col-span-4 xl:col-span-3">
                    <label
                      htmlFor=""
                      className="block text-white text-sm uppercase mb-3 tracking-wide"
                    >
                      Número
                    </label>
                    <input
                      type="tel"
                      placeholder="+57 123 456 7899"
                      className="w-full bg-transparent border-2 border-light-900 p-2 rounded-xl placeholder-light-900 outline-none"
                    />
                  </div>
                  <div className="col-span-6 md:col-span-5 xl:col-span-2 mb-4 xl:mb-24">
                    <label
                      htmlFor=""
                      className="block text-white text-sm uppercase mb-3 tracking-wide"
                    >
                      instagram
                    </label>
                    <input
                      type="text"
                      placeholder="Pega la URL de tu perfil"
                      className="w-full bg-transparent border-2 border-light-900 p-2 rounded-xl placeholder-light-900 outline-none"
                    />
                  </div>
                  <div className="col-span-6 md:col-span-5 xl:col-span-2 mb-4 xl:mb-24">
                    <label
                      htmlFor=""
                      className="block text-white text-sm uppercase mb-3 tracking-wide"
                    >
                      facebook
                    </label>
                    <input
                      type="text"
                      placeholder="Pega la URL de tu perfil"
                      className="w-full bg-transparent border-2 border-light-900 p-2 rounded-xl placeholder-light-900 outline-none"
                    />
                  </div>
                  <div className="col-span-6 md:col-span-5 xl:col-span-2 mb-8 xl:mb-24">
                    <label
                      htmlFor=""
                      className="block text-white text-sm uppercase mb-3 tracking-wide"
                    >
                      twitter
                    </label>
                    <input
                      type="text"
                      placeholder="Pega la URL de tu perfil"
                      className="w-full bg-transparent border-2 border-light-900 p-2 rounded-xl placeholder-light-900 outline-none"
                    />
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

export default ContactInfo
