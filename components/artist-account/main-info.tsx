import debounce from 'lodash.debounce'
import SideMenu from './side-menu'
import toast, { Toaster } from 'react-hot-toast'
import GooglePlacesAutocomplete, {
  getLatLng,
  geocodeByAddress,
} from 'react-google-places-autocomplete'
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useUser from 'hooks/use-user'
import { FiHelpCircle } from 'react-icons/fi'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

const MainInfo = () => {
  const [name, setName] = useState('')
  const [city, setCity] = useState(null)
  const [userName, setUserName] = useState('')
  const { register, handleSubmit, watch, errors } = useForm()

  const watchName: string = watch('name')

  const { state } = useUser()

  console.log(state, 'esto que ')

  // useEffect(() => {
  //   console.log(watchName, 'watch')
  //   if (watchName != '') {
  //     console.log(watchName, 'this')
  //     const slug = watchName
  //       .normalize('NFD')
  //       .replace(/[\u0300-\u036f]/g, '')
  //       .replace(' ', '')

  //     setUserName(slug)
  //   }
  // }, [watchName])

  const onSubmit = (data) => console.log(data)

  const handleCity = async (e) => {
    console.log(e, 'okey')
    const results = await geocodeByAddress(e.value.description)
    const latLng = await getLatLng(results[0])

    console.log(results, latLng)
    setCity(e)

    toast('Ciudad actualizada')
  }

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`)
        const { exists } = await ref.get()
        console.log('Firestore read executed!')
        setIsValid(!exists)
        setLoading(false)
      }
    }, 500),
    []
  )

  const handleName = (e) => {
    const name: string = e.target.value
    setName(name)

    if (name != '') {
      console.log(name, 'this')
      const slug = name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[ ,]+/g, '')
        .toLowerCase()

      setUserName(slug)
    }
  }

  const changeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e, 'que es e')

    const nick = e.target.value
    console.log(nick, 'el username')
    setUserName(nick)
  }

  const saveUserName = () => {
    console.log(userName, 'el username')
  }

  const boxClass =
    'relative w-10/12 sm:w-2/3 h-auto bg-dark-700 bg-opacity-50 rounded-xl p-6 sm:p-12 mb-10 lg:mb-0'
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
            style={{ boxShadow: '1px 0px 5px #000', transition: 'height .5s' }}
            className="relative w-10/12 sm:w-2/3  bg-dark-700 bg-opacity-50 rounded-xl p-6 sm:p-12 mb-10 lg:mb-0"
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
                        value={name}
                        onChange={handleName}
                        required
                      />
                    </label>

                    {name != '' && (
                      <div>
                        <div className="text-white flex items-center">
                          <div>
                            tintalove.com/
                            <span className="text-red-500">{userName}</span>
                          </div>
                          <div className="ml-5">
                            {/* <span>Esta disponible!</span> */}
                            <span>Usuario no disponible</span>
                          </div>

                          <Popup
                            trigger={
                              <span>
                                <FiHelpCircle className="text-xl ml-3 cursor-help" />
                              </span>
                            }
                            on={['hover', 'focus']}
                            position="right center"
                          >
                            <div className="text-sm">
                              Así te encontrarán en TintaLove
                            </div>
                          </Popup>
                        </div>

                        <div className="mt-3">
                          <input
                            className="text-gray-400  bg-transparent border-2 border-light-900 p-2 rounded-xl placeholder-light-900"
                            type="text"
                            autoComplete="off"
                            value={userName}
                            onChange={changeUserName}
                          />
                          <button
                            onClick={saveUserName}
                            className="text-white ml-4 bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-sm"
                            type="button"
                          >
                            Cambiar usuario
                          </button>
                        </div>
                      </div>
                    )}
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
                          value: city,
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
