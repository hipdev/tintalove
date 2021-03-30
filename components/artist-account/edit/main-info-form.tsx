import { Transition } from '@headlessui/react'
import { useStateMachine } from 'little-state-machine'

import debounce from 'lodash.debounce'
import toast, { Toaster } from 'react-hot-toast'
import GooglePlacesAutocomplete, {
  getLatLng,
  geocodeByAddress,
} from 'react-google-places-autocomplete'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FiAlertCircle, FiCheckCircle, FiHelpCircle } from 'react-icons/fi'

import { createArtist, updateArtistUsername, userNameAvailable } from 'lib/db'
import { capitalizeAllWords } from 'lib/utils'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { login } from 'lib/actions'
import MainInfoAvailable from './main-info-available'

const regexUsername = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/

const MainInfoForm = ({ uid, artist }) => {
  console.log(artist, 'esto que es')
  const { register, setValue, getValues, handleSubmit, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      show: true,
      customNick: false,
      availableUsername: true,
      validUserName: true,
      displayName: artist.displayName || '',
      username: artist.username || '',
      bio: artist.bio,
    },
  })

  console.log(artist?.displayName, 'displyName')

  const { state: loginState, actions } = useStateMachine({
    login,
  })

  const watchUserName = watch('username')
  const watchMultiple = watch(['displayName', 'bio'])
  const cityRef = useRef(null)

  const [artistUsername, setArtistUserName] = useState(artist.username)
  const [loading, setLoading] = useState(false)
  const [city, setCity] = useState(null)
  const [counter, setCounter] = useState(0)
  const [placeInfo, setPlaceInfo] = useState(null)

  const [availableUserName, setAvailableUserName] = useState(true)
  const [validUserName, setValidUserName] = useState(true)

  const [show, setShow] = useState(true)
  const [customNick, setCustomNick] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setCity({ label: artist.formatted_address, value: 0 })
  }, [])

  const handleCounter = useCallback(
    (e) => {
      const text = e.target.value
      setCounter(text.length)
    },
    [counter]
  )

  const handleCity = async (e) => {
    console.log(e, 'la city')
    const results = await geocodeByAddress(e.value.description)

    if (results) {
      const latLng = await getLatLng(results[0])

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

      setCity({ label: results[0].formatted_address, value: 0 })
    }
  }

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

  const updateName = useCallback(
    debounce((name) => {
      if (name != '') {
        console.log('se ejecuta el debounce')
        setValue('displayName', name)
      }
    }, 3000),
    []
  )

  const handleName = (e) => {
    const name: string = e.target.value

    const capitalName = capitalizeAllWords(name).replace(/[^a-zA-Z0-9 ]/g, '')

    setValue('displayName', capitalName)

    const formattedName = capitalName.replace(/\s\s+/g, ' ').trim()

    updateName(formattedName)

    setValue('displayName', capitalizeAllWords(name))
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

    if (!placeInfo && data.displayName == artist.displayName && data.bio == artist.bio) {
      cityRef.current.focus()
      setLoading(false)
      toast('😓 Debes indicar al menos una ciudad, nombre o biografía')
      return
    }

    if (!validUserName && !availableUserName) {
      setLoading(false)
      toast('Usuario no disponible o es inválido 😓')
      return
    }

    const formData = { ...data, ...placeInfo }

    toast.promise(createArtist(uid, formData), {
      loading: 'Guardando...',
      success: (data) => {
        setLoading(false)
        actions.login(true) // reload global user state data
        router.push('/artist/new/working-info')
        return 'Artista creado 😉'
      },
      error: (err) => {
        setLoading(false)
        return `${err.toString()}`
      },
    })
    // setLoading(false)
  }

  const saveUsername = async () => {
    setLoading(true)
    console.log(getValues('username'), 'me diste click')
    const newUsername = getValues('username')
    toast.promise(updateArtistUsername(uid, artistUsername, newUsername), {
      loading: 'Actualizando usuario...',
      success: (data) => {
        setLoading(false)
        setArtistUserName(newUsername)
        return 'Usuario actualizado 😉'
      },
      error: (err) => {
        setLoading(false)
        return `${err.toString()}`
      },
    })
  }
  console.log(
    artist,
    artist.displayName,
    watchMultiple.displayName,
    'que es artist info'
  )

  return (
    <>
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
                        availableUserName || watchUserName == artistUsername
                          ? 'text-green-500'
                          : 'text-red-500'
                      }
                    >
                      {watchUserName}
                    </span>
                  </div>
                  <div className="ml-5">
                    {watchUserName == artistUsername && (
                      <span className="flex items-center">
                        Este es tu usuario actual
                      </span>
                    )}
                    {watchUserName != artistUsername && (
                      <MainInfoAvailable
                        validUserName={validUserName}
                        availableUserName={availableUserName}
                      />
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

                  {watchUserName != artistUsername && availableUserName && (
                    <button
                      disabled={loading}
                      onClick={saveUsername}
                      className="text-white ml-4 bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-sm"
                      type="button"
                    >
                      Cambiar usuario
                    </button>
                  )}
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

        {artist.displayName != watchMultiple.displayName ||
        artist.formatted_address != city?.label ||
        artist.bio != watchMultiple.bio ? (
          <button
            type="submit"
            disabled={loading}
            className="block absolute right-10 -bottom-5 btn-red py-3 px-5"
          >
            Actualizar
          </button>
        ) : null}
      </form>
    </>
  )
}

export default MainInfoForm
