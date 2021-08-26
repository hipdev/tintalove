import debounce from 'lodash.debounce'
import toast from 'react-hot-toast'
import { ChangeEvent, useCallback, useRef, useState } from 'react'

import { capitalizeAllWords } from 'lib/utils'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import MainInfoAvailable from './MainInfoAvailable'
import { FiAlertCircle, FiCheckCircle, FiHelpCircle } from 'react-icons/fi'

import 'microtip/microtip.css'

import MainInfoCity from './MainInfoCity'
import {
  updateArtistMainInfo,
  updateArtistUsername,
  userNameAvailable,
} from 'lib/queries/artists'

const regexUsername = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/

const MainInfoForm = ({ uid, artist }) => {
  const { register, setValue, getValues, handleSubmit, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      customNick: false,
      availableUsername: true,
      validUserName: true,
      name: artist.name || '',
      email: artist.email || '',
      username: artist.username || '',
      bio: artist.bio,
    },
  })

  const watchUserName = watch('username')
  const watchMultiple: any = watch()
  const cityRef = useRef(null)

  const [artistUsername, setArtistUserName] = useState(artist.username)
  const [loading, setLoading] = useState(false)

  const [counter, setCounter] = useState(artist.bio.length || 0)
  const [placeInfo, setPlaceInfo] = useState({
    formatted_address: artist.formatted_address || '',
    province: artist.province || '',
    _geoloc: artist._geoloc || '',
    country: artist.country || '',
    city_name: artist.city_name || '',
  })

  const [availableUserName, setAvailableUserName] = useState(true)
  const [validUserName, setValidUserName] = useState(true)

  const router = useRouter()

  const handleCounter = useCallback(
    (e) => {
      const text = e.target.value
      setCounter(text.length)
      setValue('bio', text)
    },
    [counter]
  )

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
        setValue('name', name)
      }
    }, 3000),
    []
  )

  const handleName = (e) => {
    const name: string = e.target.value

    const capitalName = capitalizeAllWords(name).replace(
      /[^a-zA-Z0-9,a-zA-Z\u00C0-\u024F ]/g, //Aceptar acentos latinos
      ''
    )

    const formattedName = capitalName.replace(/\s\s+/g, ' ').trim()
    updateName(formattedName)
    setValue('name', capitalizeAllWords(name))
  }

  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
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
  }

  const saveUsername = async () => {
    setLoading(true)

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

  const onSubmit = async (data) => {
    setLoading(true)
    if (data.name == '' || data.bio == '') {
      setLoading(false)
      toast('Debes ingresar el nombre y la bio 😓')
      return
    }

    if (!placeInfo && data.name == artist.name && data.bio == artist.bio) {
      cityRef.current.focus()
      setLoading(false)
      toast('😓 Debes indicar al menos una ciudad, nombre o biografía')
      return
    }

    let formData = {
      bio: data.bio,
      name: data.name,
      email: data.email,
    }

    if (placeInfo) formData = { ...placeInfo, ...formData } // Aqui meto PlaceInfo cuando cambian la ciudad

    toast.promise(updateArtistMainInfo(uid, formData), {
      loading: 'Actualizando artista...',
      success: (data) => {
        setLoading(false)
        // setTriggerAuth(Math.random()) // reload global user state data
        router.push('/artist/working-info')
        return 'Artista actualizado 😉'
      },
      error: (err) => {
        setLoading(false)
        return `${err.toString()}`
      },
    })

    // setLoading(false)
  }

  return (
    <>
      <form className="relative" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-6 gap-6 tooltipBox">
          <div className="col-span-6 md:col-span-3">
            <label className="block text-white text-sm mb-2 tracking-wide">
              <span className="mb-3 block uppercase">Nombre artístico</span>
              <input
                {...register('name')}
                autoComplete="off"
                placeholder="..."
                className="input-primary w-full"
                onChange={handleName}
                required
              />
            </label>
          </div>
          <div className="col-span-6 md:col-span-3">
            <label className="block text-white text-sm mb-2 tracking-wide">
              <div className="flex">
                <span className="mb-3 block uppercase">Ciudad</span>
                <span
                  aria-label="Esta ubicación es importante, todas tus publicaciones estarán asociadas a ella."
                  data-microtip-position="top"
                  role="tooltip"
                >
                  <FiHelpCircle className="text-xl ml-3 cursor-help" />
                </span>
              </div>

              <MainInfoCity
                defaultValue={artist.formatted_address || ''}
                setPlaceInfo={setPlaceInfo}
              />
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
                    availableUserName || watchUserName == artistUsername
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
                      {availableUserName || watchUserName == artistUsername ? (
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

              {watchUserName == artistUsername && (
                <span className="mt-2 block">Este es tu usuario actual</span>
              )}
            </label>
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="text-white flex items-center">
              {watchUserName != artistUsername && (
                <MainInfoAvailable
                  validUserName={validUserName}
                  availableUserName={availableUserName}
                />
              )}
            </div>

            {validUserName &&
              watchUserName != artistUsername &&
              availableUserName && (
                <button
                  disabled={loading}
                  onClick={saveUsername}
                  className="text-white bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-sm mt-4"
                  type="button"
                >
                  Cambiar usuario
                </button>
              )}
          </div>

          <div className="col-span-6">
            <div className="flex justify-between items-center mb-3">
              <label
                htmlFor=""
                className="block text-white text-sm tracking-wide"
              >
                <span className="uppercase">Biografía</span>
              </label>
              <span className="text-white ">{counter}/500</span>
            </div>
            <textarea
              maxLength={500}
              required
              {...register('bio')}
              onChange={handleCounter}
              rows={6}
              placeholder="Cuentale al mundo sobre ti"
              className="w-full input-primary resize-none"
            ></textarea>
          </div>

          <div className="col-span-6 md:col-span-3 mb-6">
            <label className="block text-white text-sm mb-2 tracking-wide">
              <span className="mb-3 block uppercase">Correo principal</span>
              <input
                type="email"
                {...register('email')}
                autoComplete="off"
                placeholder="Tu correo electrónico"
                className="input-primary w-full"
                required
              />
            </label>
          </div>
        </div>

        {artist.name != watchMultiple.name ||
        artist.email != watchMultiple.email ||
        artist.formatted_address != placeInfo?.formatted_address ||
        artist.bio != watchMultiple.bio ? (
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="block btn-primary py-3 px-5"
            >
              Actualizar
            </button>
          </div>
        ) : null}
      </form>
    </>
  )
}

export default MainInfoForm
