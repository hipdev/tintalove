import SideMenu from './side-menu'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useUser from 'hooks/use-user'

const MainInfo = () => {
  const [value, setValue] = useState(null)
  const { register, handleSubmit, watch, errors } = useForm()

  const { state } = useUser()

  console.log(state, 'esto que ')

  const onSubmit = (data) => console.log(data)

  const handleCity = (e) => {
    console.log(e, 'okey')
    setValue(e)
  }
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 md:col-span-3">
                    <label
                      htmlFor=""
                      className="block text-white text-sm uppercase mb-3 tracking-wide"
                    >
                      Nombre artístico
                    </label>
                    <input
                      name="name"
                      placeholder="..."
                      className="text-gray-400 w-full bg-transparent border-2 border-light-900 p-2 rounded-xl placeholder-light-900 outline-none"
                      ref={register({ required: true })}
                      required
                    />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label
                      htmlFor=""
                      className="block text-white text-sm uppercase mb-3 tracking-wide"
                    >
                      Ciudad
                    </label>
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
                      placeholder="Cuentale a tus clientes un poco sobre ti"
                      className="w-full text-gray-400  bg-transparent border-2 border-light-900 p-2 rounded-xl placeholder-light-900 outline-none resize-none"
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="block absolute right-10 -bottom-5 btn-red py-3 px-5"
                >
                  Siguiente
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
