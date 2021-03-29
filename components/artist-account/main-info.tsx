import { Transition } from '@headlessui/react'
import { useStateMachine } from 'little-state-machine'

import debounce from 'lodash.debounce'
import SideMenu from './side-menu'
import toast, { Toaster } from 'react-hot-toast'
import GooglePlacesAutocomplete, {
  getLatLng,
  geocodeByAddress,
} from 'react-google-places-autocomplete'
import React, { useCallback, useRef, useState } from 'react'
import { FiAlertCircle, FiCheckCircle, FiHelpCircle } from 'react-icons/fi'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { createArtist, userNameAvailable } from 'lib/db'
import { capitalizeAllWords } from 'lib/utils'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { login } from 'lib/actions'
import { useUserData } from 'hooks/use-user-data'

const regexUsername = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/

const MainInfo = ({ uid }) => {
  const { register, setValue, getValues, handleSubmit, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      show: false,
      customNick: false,
      availableUsername: false,
      validUserName: false,
      displayName: '',
      username: '',
    },
  })

  const { state: loginState, actions } = useStateMachine({
    login,
  })

  const { setTriggerAuth } = useUserData()

  const watchUserName = watch('username')
  const cityRef = useRef(null)

  const [loading, setLoading] = useState(false)
  const [city, setCity] = useState(null)
  const [counter, setCounter] = useState(0)
  const [placeInfo, setPlaceInfo] = useState(null)

  const [availableUserName, setAvailableUserName] = useState(false)
  const [validUserName, setValidUserName] = useState(false)

  const [show, setShow] = useState(false)
  const [customNick, setCustomNick] = useState(false)

  const router = useRouter()

  const handleCounter = useCallback(
    (e) => {
      const text = e.target.value
      setCounter(text.length)
    },
    [counter]
  )

  const handleCity = async (e) => {
    const results = await geocodeByAddress(e.value.description)

    if (results) {
      const latLng = await getLatLng(results[0])

      console.log(results)
      console.log(latLng)

      const fullAddress = results[0].formatted_address.split(',')
      const city_name = fullAddress[0]
      const province = fullAddress[1].trim() || ''
      const country = (fullAddress[2] && fullAddress[2].trim()) || 'Colombia'

      // guardaré la lat y long para futuras opciones con geolocalización
      setPlaceInfo({
        place_id: results[0].place_id,
        formatted_address: results[0].formatted_address,
        city_name,
        province,
        country,
      })

      setCity({ label: e.label, value: 0 })
    }
  }

  console.log(placeInfo, 'la ciudad')

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username != '') {
        const available = await userNameAvailable(username)
        setAvailableUserName(available)

        // Falta validar cuando el username esta disponible agregar el estado para guardar

        // setLoading(false)
      } else {
        setAvailableUserName(false)
      }
    }, 500),
    []
  )

  const handleName = (e) => {
    const name: string = e.target.value

    setValue('displayName', capitalizeAllWords(name))

    if (name != '' && !customNick) {
      setAvailableUserName(false)

      const username = name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[ ,]+/g, '')
        .toLowerCase()

      if (regexUsername.test(username)) {
        checkUsername(username)
        setValidUserName(true)

        setValue('username', username)
      }

      setValue('username', username)

      setShow(true)
    }
    if (name == '') setShow(false)
  }

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidUserName(false)
    setAvailableUserName(false)

    const nick = e.target.value.toLowerCase()

    if (regexUsername.test(nick)) {
      checkUsername(nick)
      setValidUserName(true)
    } else {
      setValidUserName(false)
      setAvailableUserName(false)
    }
    setValue('username', nick)

    setCustomNick(true)
  }

  const onSubmit = async (data) => {
    setLoading(true)
    if (!placeInfo) {
      cityRef.current.focus()
      setLoading(false)
      toast('😓 Debes indicar una ciudad')
      return
    }

    if (!validUserName && !availableUserName) {
      console.log(validUserName, availableUserName, 'estados')
      setLoading(false)
      toast('Usuario no disponible o es inválido 😓')
      return
    }

    const formData = { ...data, ...placeInfo }

    toast
      .promise(createArtist(uid, formData), {
        loading: 'Guardando...',
        success: (data) => {
          setLoading(false)
          setTriggerAuth(Math.random()) // reload global user state data
          // router.push('/artist/new/working-info')

          return 'Artista creado 😉'
        },
        error: (err) => {
          setLoading(false)
          return `${err.toString()}`
        },
      })
      .then((res) => {
        if (res) {
          setTriggerAuth(Math.random())
          router.push('/artist/new/working-info')
        }
      })

    // setLoading(false)

    console.log(data, 'form data')
  }

  return (
    <div className="w-full h-auto bg-gradient-to-r from-dark-700 to-black 2xl:h-screen pt-10 2xl:pt-0">
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
      <div className="h-full flex flex-col">
        <div className="h-full flex flex-col lg:flex-row justify-evenly items-center">
          <SideMenu />

          <div
            style={{ boxShadow: '1px 0px 5px #000' }}
            className="relative w-10/12 sm:w-2/3  bg-dark-700 bg-opacity-50 rounded-xl p-6 sm:p-12 mb-10 lg:mb-0 h-auto"
          >
            <div>
              <h1 className="text-white text-xl sm:text-2xl font-bold text-center sm:text-left tracking-wide mb-2">
                Información personal
              </h1>
              <p className="text-white mb-5 sm:mb-6 lg:mb-8">
                Gracias por ser parte de la familia Tinta Love, cuando llenes
                todos los pasos aparecerá un botón mágico para activar tu perfil
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-6 gap-6 tooltipBox">
                  <div className="col-span-6 md:col-span-3">
                    <label className="block text-white text-sm uppercase mb-2 tracking-wide">
                      <span className="mb-3 block">Nombre artístico</span>
                      <input
                        ref={register}
                        name="displayName"
                        autoComplete="off"
                        placeholder="..."
                        className="text-gray-400 d w-full bg-transparent border-2 border-light-900 p-2 rounded-xl placeholder-light-900 outline-none"
                        onChange={handleName}
                        required
                      />
                    </label>
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="block text-white text-sm uppercase mb-2 tracking-wide">
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
                          placeholder: 'Escribe tu ciudad...',
                          noOptionsMessage: () => <span>Sin opciones</span>,
                          // defaultMenuIsOpen: true,
                          // menuIsOpen: true,
                          classNamePrefix: 'create_artist',
                          // autoFocus: true,
                          ref: cityRef,
                        }}
                      />
                    </label>
                  </div>

                  <div className="col-span-full ">
                    <Transition
                      show={show || customNick}
                      enter="transition-opacity duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div>
                        <div className="text-white flex items-center">
                          <div>
                            tintalove.com/
                            <span
                              className={
                                availableUserName
                                  ? 'text-green-500'
                                  : 'text-red-500'
                              }
                            >
                              {watchUserName}
                            </span>
                          </div>
                          <div className="ml-5">
                            {validUserName ? (
                              <div>
                                {availableUserName ? (
                                  <div className="flex items-center">
                                    <span className="flex items-center">
                                      Esta disponible!
                                      <FiCheckCircle className="ml-1 text-2xl text-green-500" />
                                    </span>
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
                                ) : (
                                  <div className="flex items-center">
                                    <span className="flex items-center">
                                      No disponible
                                      <FiAlertCircle className="ml-1 text-2xl text-red-500" />
                                    </span>
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
                                        Intenta con otro usuario en el cuadro de
                                        abajo.
                                      </div>
                                    </Popup>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <span>Formato inválido</span>
                                <Popup
                                  trigger={
                                    <span>
                                      <FiHelpCircle className="text-xl ml-3 cursor-help" />
                                    </span>
                                  }
                                  on={['hover', 'focus']}
                                  position="right center"
                                  keepTooltipInside=".tooltipBox"
                                >
                                  <div className="text-sm">
                                    Intenta con otro nombre de usuario, puedes
                                    usar letras, números. También _ y . pero no
                                    seguidos o al final del usuario
                                  </div>
                                </Popup>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-3">
                          <input
                            name="username"
                            className="text-gray-400  bg-transparent border-2 border-light-900 p-2 rounded-xl placeholder-light-900"
                            type="text"
                            autoComplete="off"
                            ref={register}
                            onChange={handleUserName}
                          />

                          {/* <button
                            onClick={saveUserName}
                            className="text-white ml-4 bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-sm"
                            type="button"
                          >
                            Cambiar usuario
                          </button> */}
                        </div>
                      </div>
                    </Transition>
                  </div>
                  <div className="col-span-6 mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <label
                        htmlFor=""
                        className="block text-white text-sm uppercase tracking-wide"
                      >
                        biografia
                      </label>
                      <span className="text-white">{counter}/500</span>
                    </div>
                    <textarea
                      name="bio"
                      onChange={handleCounter}
                      maxLength={500}
                      required
                      ref={register}
                      rows={6}
                      placeholder="Cuentale al mundo sobre ti"
                      className="w-full text-gray-400  bg-transparent border-2 border-light-900 p-2 rounded-xl placeholder-light-900 outline-none resize-none"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
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
