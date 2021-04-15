import { Toaster } from 'react-hot-toast'
import SideMenu from './side-menu-artist'

const ContactInfo = ({ uid, isArtist }) => {
  return (
    <div className="w-4/5 mt-10">
      <Toaster
        toastOptions={{
          className: 'bg-red-600',
          style: {
            background: '#ef3e30',
            border: 'none',
            borderRadius: '3px',
            color: '#fff',
          },
          duration: 5000,
        }}
        position="bottom-right"
      />
      <h1 className="text-xl sm:text-2xl font-bold  sm:text-left tracking-wide mb-2">
        Información de Contacto
      </h1>

      <form className="mt-10">
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
        <button className="block absolute right-10 -bottom-5 btn-red py-3 px-5">
          Siguiente
        </button>
      </form>
    </div>
  )
}

export default ContactInfo
