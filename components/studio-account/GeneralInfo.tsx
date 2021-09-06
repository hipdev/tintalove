import debounce from 'lodash.debounce'
import toast from 'react-hot-toast'
import React, { useCallback, useEffect, useState } from 'react'
import { FiAlertCircle, FiCheckCircle, FiHelpCircle } from 'react-icons/fi'
import { capitalizeAllWords } from 'lib/utils'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import MainInfoAvailable from './general-info-edit/GeneralInfoAvailable'

import 'microtip/microtip.css'
import GeneralInfoCity from './general-info-edit/GeneralInfoCity'
import { createStudio, userNameAvailableStudio } from 'lib/queries/studios'

const regexUsername = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/

const GeneralInfo = ({ uid }) => {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      show: false,
      customNick: false,
      availableUsername: false,
      validUserName: false,
      studio_name: '',
      username: '',
      bio: '',
      email: '',
    },
  })

  const watchUsername = watch('username')

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [counter, setCounter] = useState(0)
  const [placeInfo, setPlaceInfo] = useState(null)

  const [availableUserName, setAvailableUserName] = useState(false)
  const [validUserName, setValidUserName] = useState(false)

  const [customNick, setCustomNick] = useState(false)

  const router = useRouter()

  const handleCounter = useCallback(
    (e) => {
      const text = e.target.value
      setValue('bio', text)
      setCounter(text.length)
    },
    [counter]
  )

  useEffect(() => {
    if (success) {
      const timer = setTimeout(
        () => router.push('/studio-account/artists'),
        1000
      )
      return () => clearTimeout(timer)
    }
  }, [success])

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username != '') {
        const available = await userNameAvailableStudio(username)
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
        setValue('studio_name', name)
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

    setValue('studio_name', capitalName)

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
    }
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
      setLoading(false)
      toast('Usuario no disponible o es inválido 😓')
      return
    }

    const formData = {
      studio_name: data.studio_name
        .replace(/[^a-zA-Z0-9 ]/g, '') // clear spaces and only allow one space between words
        .replace(/\s\s+/g, ' ')
        .trim(),
      bio: data.bio.replace(/\s\s+/g, ' ').trim(),
      username: data.username,
      email: data.email,
      ...placeInfo,
    }

    toast.promise(createStudio(uid, formData, true), {
      loading: 'Creando estudio...',
      success: (data) => {
        setLoading(false)
        setSuccess(true)
        // setTriggerAuth(Math.random()) // reload global user state data

        return 'Estudio creado 😉'
      },
      error: (err) => {
        setLoading(false)
        return `${err.toString()}`
      },
    })
  }

  return (
    <>
      <div className="w-4/5 mt-10">
        <h1 className="text-white text-xl sm:text-2xl font-bold  sm:text-left tracking-wide mb-2">
          Información personal
        </h1>
        <p className="text-white mb-5 sm:mb-6 lg:mb-8">
          Gracias por ser parte de la familia Tinta Love, cuando llenes todos
          los pasos aparecerá un botón mágico para activar el perfil del
          estudio.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-6 gap-6 tooltipBox">
            <div className="col-span-6 md:col-span-3">
              <label className="block text-white text-sm uppercase mb-2 tracking-wide">
                <span className="mb-3 block">Nombre del estudio</span>
                <input
                  {...register('studio_name')}
                  autoComplete="off"
                  placeholder="..."
                  className="input-primary w-full"
                  onChange={handleName}
                  required
                />
              </label>
            </div>
            <div className="col-span-6 md:col-span-3">
              <label className="block text-white text-sm  mb-2 tracking-wide">
                <span className="mb-3 block">CIUDAD</span>
                <GeneralInfoCity defaultValue="" setPlaceInfo={setPlaceInfo} />
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
                        ? 'input-primary w-full pl-[126px] text-green-500'
                        : 'input-primary w-full pl-[126px] text-red-500'
                    }
                    type="text"
                    autoComplete="off"
                    spellCheck="false"
                    {...register('username')}
                    onChange={handleUserName}
                  />
                  <span className="absolute top-[13px] left-[10px]">
                    tintalove.com/st/
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

            {watchUsername && (
              <div className="col-span-6 md:col-span-3 self-center">
                <div className="text-white flex items-center">
                  <MainInfoAvailable
                    validUserName={validUserName}
                    availableUserName={availableUserName}
                  />
                </div>
              </div>
            )}

            <div className="col-span-6 mb-6">
              <div className="flex justify-between items-center mb-3">
                <label
                  htmlFor=""
                  className="flex text-white text-sm tracking-wide"
                >
                  <span>HISTORIA / BIO</span>
                  <span
                    aria-label="Esta es la descripción de tu perfil de estudio"
                    data-microtip-position="top"
                    role="tooltip"
                  >
                    <FiHelpCircle className="text-xl ml-3 cursor-help" />
                  </span>
                </label>
                <span className="text-white">{counter}/500</span>
              </div>
              <textarea
                maxLength={500}
                required
                {...(register('bio'), { required: true })}
                onChange={handleCounter}
                rows={6}
                placeholder="Cuentale al mundo sobre ti"
                className="w-full text-gray-400  bg-transparent border-2 border-light-900 p-2 rounded-xl placeholder-light-900 outline-none resize-none"
              ></textarea>

              {errors?.bio && <span>Este campo es requerido</span>}
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

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="block  btn-primary py-3 px-5"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default GeneralInfo
