import debounce from 'lodash.debounce'
import toast, { Toaster } from 'react-hot-toast'

import React, { useCallback, useRef, useState } from 'react'
import { FiAlertCircle, FiCheckCircle, FiHelpCircle } from 'react-icons/fi'
import { createArtist, userNameAvailable } from 'lib/db'
import { capitalizeAllWords } from 'lib/utils'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { useUserData } from 'hooks/use-user-data'
import MainInfoAvailable from 'components/artist-account/main-info-edit/main-info-available'

import 'microtip/microtip.css'
import MainInfoCity from 'components/artist-account/main-info-edit/main-info-city'

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
      bio: '',
    },
  })

  const { setTriggerAuth } = useUserData()

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

    const formData = {
      displayName: data.displayName
        .replace(/[^a-zA-Z0-9 ]/g, '') // clear spaces and only allow one space between words
        .replace(/\s\s+/g, ' ')
        .trim(),
      bio: data.bio.replace(/\s\s+/g, ' ').trim(),
      username: data.username,
      ...placeInfo,
    }

    toast
      .promise(createArtist(uid, formData, true), {
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
          router.push('/artist/working-info')
          setTriggerAuth(Math.random())
        }
      })

    // setLoading(false)

    // console.log(data, 'form data')
    // console.log(formData, 'formatted data')
  }

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
      <div className="w-4/5 mt-10">
        <h1 className="text-white text-xl sm:text-2xl font-bold  sm:text-left tracking-wide mb-2">
          Información personal
        </h1>
        <p className="text-white mb-5 sm:mb-6 lg:mb-8">
          Gracias por ser parte de la familia Tinta Love, cuando llenes todos
          los pasos aparecerá un botón mágico para activar tu perfil
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-6 gap-6 tooltipBox">
            <div className="col-span-6 md:col-span-3">
              <label className="block text-white text-sm uppercase mb-2 tracking-wide">
                <span className="mb-3 block">Nombre artístico</span>
                <input
                  {...register('displayName')}
                  autoComplete="off"
                  placeholder="..."
                  className="input-primary w-full"
                  onChange={handleName}
                  required
                />
              </label>
            </div>
            <div className="col-span-6 md:col-span-3">
              <label className="block text-white text-sm uppercase mb-2 tracking-wide">
                <span className="mb-3 block">Ciudad</span>

                {/* <GooglePlacesAutocomplete
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
                    noOptionsMessage: () => 'Sin opciones',
                    // defaultMenuIsOpen: true,
                    // menuIsOpen: true,
                    classNamePrefix: 'create_artist',
                    // autoFocus: true,
                    ref: cityRef,
                  }}
                /> */}

                <MainInfoCity defaultValue="" setPlaceInfo={setPlaceInfo} />
              </label>
            </div>

            <div className="col-span-6 md:col-span-3">
              <label className="block text-white text-sm  mb-2 tracking-wide">
                <div className="flex">
                  <span className="mb-3 block uppercase">
                    SELECCIONA TU DOMINIO
                  </span>

                  <span
                    aria-label="Asi te encontrarán en Tinta Love"
                    data-microtip-position="top"
                    role="tooltip"
                  >
                    <FiHelpCircle className="text-xl ml-3 cursor-help" />
                  </span>
                </div>
                <div className="relative">
                  <input
                    className={
                      availableUserName
                        ? 'input-primary w-full pl-[109px] text-green-500'
                        : 'input-primary w-full pl-[109px] text-red-500'
                    }
                    type="text"
                    autoComplete="off"
                    spellCheck="false"
                    {...register('username')}
                    onChange={handleUserName}
                  />
                  <span className="absolute top-[13px] left-[10px]">
                    tintalove.com/
                  </span>

                  <div className="absolute right-2 top-3">
                    {validUserName ? (
                      <>
                        {availableUserName ? (
                          <FiCheckCircle className="ml-1 text-2xl text-green-500" />
                        ) : (
                          <FiAlertCircle className="ml-1 text-2xl text-red-500" />
                        )}
                      </>
                    ) : (
                      <FiAlertCircle className="ml-1 text-2xl text-red-500" />
                    )}
                  </div>
                </div>
              </label>
            </div>

            <div className="col-span-6 md:col-span-3 self-center">
              <div className="text-white flex items-center">
                <MainInfoAvailable
                  validUserName={validUserName}
                  availableUserName={availableUserName}
                />
              </div>
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
                onChange={handleCounter}
                maxLength={500}
                required
                {...register('bio')}
                rows={6}
                placeholder="Cuentale al mundo sobre ti"
                className="w-full text-gray-400  bg-transparent border-2 border-light-900 p-2 rounded-xl placeholder-light-900 outline-none resize-none"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="block  btn-red py-3 px-5"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default MainInfo
