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
              className="block text-white text-sm  mb-3 tracking-wide"
            >
              <span className="mb-3 block">
                POR DÓNDE QUIERES QUE TE CONTACTEN
              </span>

              <select className="w-full input-primary">
                <option value="" selected>
                  Llamada directa
                </option>
                <option value="" selected>
                  WhatsApp
                </option>
                <option value="" selected>
                  Telegram
                </option>
                <option value="" selected>
                  Chat de Instagram
                </option>
              </select>
            </label>
          </div>
          <div className="col-span-6 lg:col-span-4 xl:col-span-3">
            <label
              htmlFor=""
              className="block text-white text-sm mb-3 tracking-wide"
            >
              <span className="mb-3 block">NÚMERO</span>

              <input
                type="tel"
                placeholder="+57 123 456 7899"
                className="w-full input-primary"
              />
            </label>
          </div>
          <div className="col-span-6 md:col-span-5 xl:col-span-2 mb-4 xl:mb-24">
            <label
              htmlFor=""
              className="block text-white text-sm  mb-3 tracking-wide"
            >
              <span className="mb-3 block">INSTAGRAM</span>

              <input
                type="text"
                placeholder="Pega la URL de tu perfil"
                className="w-full input-primary"
              />
            </label>
          </div>
          <div className="col-span-6 md:col-span-5 xl:col-span-2 mb-4 xl:mb-24">
            <label
              htmlFor=""
              className="block text-white text-sm  mb-3 tracking-wide"
            >
              <span className="mb-3 block">FACEBOOK</span>

              <input
                type="text"
                placeholder="Pega la URL de tu perfil"
                className="w-full input-primary"
              />
            </label>
          </div>
          <div className="col-span-6 md:col-span-5 xl:col-span-2 mb-4 xl:mb-24">
            <label
              htmlFor=""
              className="block text-white text-sm  mb-3 tracking-wide"
            >
              <span className="mb-3 block">TWITTER</span>

              <input
                type="text"
                placeholder="Pega la URL de tu perfil"
                className="w-full input-primary"
              />
            </label>
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
