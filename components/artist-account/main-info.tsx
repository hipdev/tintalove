import SideMenu from './side-menu'
import toast, { Toaster } from 'react-hot-toast'
import GooglePlacesAutocomplete, {
  getLatLng,
  geocodeByAddress,
} from 'react-google-places-autocomplete'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useUser from 'hooks/use-user'

const MainInfo = () => {
  const [value, setValue] = useState(null)
  const { register, handleSubmit, watch, errors } = useForm()

  const { state } = useUser()

  console.log(state, 'esto que ')

  const onSubmit = (data) => console.log(data)

  const handleCity = async (e) => {
    console.log(e, 'okey')
    const results = await geocodeByAddress(e.value.description)
    const latLng = await getLatLng(results[0])

    console.log(results, latLng)
    setValue(e)

    toast('Ciudad actualizada')
  }
  return (
    <div className="w-full h-auto lg:h-screen  bg-gradient-to-r from-dark-700   to-black">
      <Toaster
        toastOptions={{
          className: 'bg-red-600',
          style: {
            background: '#ef3e30',
            border: 'none',
            borderRadius: '3px',
            color: '#fff',
          },
          duration: 4000,
        }}
        position="bottom-right"
      />
      <div className="h-full flex flex-col">
        <div className="h-full flex flex-col lg:flex-row justify-evenly items-center">
          <SideMenu />

          <div
            style={{ boxShadow: '1px 0px 5px #000' }}
            className="relative w-10/12 sm:w-2/3 h-auto bg-dark-700 bg-opacity-50 rounded-xl p-6 sm:p-12 mb-10 lg:mb-0"
          >
            <div>
              <h1
                onClick={() => toast('Ciudad actualizada')}
                className="text-white text-xl sm:text-2xl font-bold text-center sm:text-left tracking-wide mb-10"
              >
                Información personal
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 md:col-span-3">
                    <label className="block text-white text-sm uppercase mb-3 tracking-wide">
                      <span className="mb-3 block">Nombre artístico</span>
                      <input
                        name="name"
                        autoComplete="off"
                        placeholder="..."
                        className="text-gray-400 w-full bg-transparent border-2 border-light-900 p-2 rounded-xl placeholder-light-900 outline-none"
                        ref={register({ required: true })}
                        required
                      />
                    </label>

                    <div className="text-white flex">
                      <div>
                        tintalove.com/
                        <span className="text-red-500">dann-coly</span>
                      </div>
                      <div className="ml-5">
                        {/* <span>Esta disponible!</span> */}
                        <span>Fk, no disponible</span>
                      </div>
                    </div>
                    <div>
                      <input
                        className="text-gray-400  bg-transparent border-2 border-light-900 p-2 rounded-xl placeholder-light-900"
                        type="text"
                        autoComplete="off"
                        value="dann-coly"
                      />
                    </div>
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="block text-white text-sm uppercase mb-3 tracking-wide">
                      <span className="mb-3 block">Ciudad</span>

                      <GooglePlacesAutocomplete
                        apiKey="AIzaSyA5drETj_sJmO1kGEDEb7tXWzwJb05ipCY"
                        debounce={500}
                        apiOptions={{ region: 'CO', language: 'es' }}
                        autocompletionRequest={{
                          componentRestrictions: { country: ['CO'] },
                          types: ['(cities)'],
                        }}
                        selectProps={{
                          value,
                          onChange: handleCity,
                          placeholder: 'Seleccionar ciudad...',
                          noOptionsMessage: () => <span>Sin opciones</span>,
                          // defaultMenuIsOpen: true,
                          // menuIsOpen: true,
                          classNamePrefix: 'create_artist',
                          // autoFocus: true,
                        }}
                      />
                    </label>
                  </div>
                  <div className="col-span-6 mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <label
                        htmlFor=""
                        className="block text-white text-sm uppercase tracking-wide"
                      >
                        biografia
                      </label>
                      {/* <span className="text-white">0/500</span> */}
                    </div>
                    <textarea
                      name="bio"
                      ref={register({ required: true })}
                      required
                      rows={6}
                      placeholder="Cuentale al mundo sobre ti"
                      className="w-full text-gray-400  bg-transparent border-2 border-light-900 p-2 rounded-xl placeholder-light-900 outline-none resize-none"
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="block absolute right-10 -bottom-5 btn-red py-3 px-5"
                >
                  Guardar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainInfo
