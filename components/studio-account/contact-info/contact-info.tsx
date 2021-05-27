import useStudio from 'hooks/use-studio'
import { updateStudioContactInfo } from 'lib/queries/studios'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import ContactInfoLocation from './contact-info-location'
import ContactInfoMapStudio from './contact-info-map'

const ContactInfoStudio = ({ studioId, hasStudio }) => {
  const [location, setLocation] = useState(null)
  const [placeInfo, setPlaceInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { studio } = useStudio(studioId)
  const router = useRouter()

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      contact_way: '',
      phone: '',
      instagram: '',
      facebook: '',
      twitter: '',
    },
  })

  const regexUrl = new RegExp('^https?://[w-]+(.[w-]+)+[/#?]?.*$', 'gm')

  useEffect(() => {
    if (studio) {
      let styles = []
      if (studio.styles) {
        styles = studio.styles.map((style) => ({
          label: style,
          value: style,
        }))
      }

      setValue('contact_way', studio.contact_way)
      setValue('phone', studio.phone)
      setValue('instagram', studio.instagram)
      setValue('facebook', studio.facebook)
      setValue('twitter', studio.twitter)
    }
  }, [studio])

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => router.push('/artist/pictures-info'), 1000)
      return () => clearTimeout(timer)
    }
  }, [success])

  const watchContactWay = watch('contact_way')

  const onSubmit = (data) => {
    setLoading(true)

    toast.promise(updateStudioContactInfo(studioId, data, true), {
      loading: 'Actualizando...',
      success: () => {
        setLoading(false)
        setSuccess(true)

        return 'Artista actualizado 😉'
      },
      error: (err) => {
        setLoading(false)
        return `${err.toString()}`
      },
    })

    setLoading(false)
  }

  return (
    <div className="w-full mt-10 pr-10 text-gray-200">
      <h1 className="text-xl sm:text-2xl font-bold  sm:text-left tracking-wide mb-2">
        Información de Contacto
      </h1>

      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-6 gap-4 gap-x-6">
          <div className="col-span-6 lg:col-span-4 xl:col-span-3">
            <label
              htmlFor=""
              className="block text-white text-sm  mb-2 tracking-wide"
            >
              <span className="mb-2 block">
                POR DÓNDE QUIERES QUE TE CONTACTEN
              </span>

              <select
                className="w-full input-primary form-select p-3 text-sm bg-dark-500 focus:ring-dark-800 focus:border-dark-800"
                {...register('contact_way', { required: true })}
              >
                <option value="">Selecciona por favor</option>
                <option value="direct-call">Llamada directa</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="telegram">Telegram</option>
                <option value="chat-instagram">Chat de Instagram</option>
              </select>
              {errors.contact_way && (
                <p className="mt-1">Esta campo es requerido</p>
              )}
            </label>
          </div>
          <div className="col-span-6 lg:col-span-4 xl:col-span-3">
            <label
              htmlFor=""
              className="block text-white text-sm mb-2 tracking-wide"
            >
              <span className="mb-2 block">NÚMERO</span>

              <Controller
                rules={{ required: true }}
                control={control}
                name="phone"
                render={({ field }) => (
                  <PhoneInput
                    country={'co'}
                    onlyCountries={[
                      'co',
                      'es',
                      'ar',
                      'it',
                      'ec',
                      'br',
                      'pe',
                      'us',
                      'ur',
                      'mx',
                    ]}
                    containerClass="input-primary p-1"
                    searchStyle={{ background: 'red' }}
                    inputStyle={{
                      background: '#111319',
                      border: 'none',
                      color: '#fff',
                    }}
                    buttonStyle={{
                      background: '#111319',
                      border: 'none',
                    }}
                    dropdownStyle={{
                      fontFamily: 'Inter',
                      background: '#080a12',
                      color: '#e2e2e2',
                    }}
                    {...field}
                  />
                )}
              />
              {errors.phone && <p className="mt-1">Esta campo es requerido</p>}
            </label>
          </div>
          <div className="col-span-6 lg:col-span-4 xl:col-span-3">
            <label
              htmlFor=""
              className="block text-white text-sm  mb-2 tracking-wide"
            >
              <span className="mb-2 block">INSTAGRAM</span>

              <input
                type="text"
                placeholder="Pega la URL de tu perfil"
                className="w-full input-primary"
                {...register('instagram', {
                  required: {
                    value: watchContactWay == 'instagram' ? true : false,
                    message: 'Este campo es requerido',
                  },
                  pattern: {
                    value: regexUrl,
                    message: 'Debe ser una url de tu perfil',
                  },
                })}
              />
              {errors.instagram && errors.instagram.message && (
                <p className="mt-1">
                  {errors.instagram && errors.instagram.message}
                </p>
              )}
            </label>
          </div>
          <div className="col-span-6 lg:col-span-4 xl:col-span-3">
            <label
              htmlFor=""
              className="block text-white text-sm  mb-2 tracking-wide"
            >
              <span className="mb-2 block">FACEBOOK</span>

              <input
                type="text"
                placeholder="Pega la URL de tu perfil"
                className="w-full input-primary"
                {...register('facebook', {
                  required: {
                    value: watchContactWay == 'chat-facebook' ? true : false,
                    message: 'Este campo es requerido',
                  },
                  pattern: {
                    value: regexUrl,
                    message: 'Debe ser la url de tu perfil',
                  },
                })}
              />
              {errors.facebook && errors.facebook.message && (
                <p className="mt-1">
                  {errors.facebook && errors.facebook.message}
                </p>
              )}
            </label>
          </div>
          <div className="col-span-6 lg:col-span-4 xl:col-span-3">
            <label
              htmlFor=""
              className="block text-white text-sm  mb-2 tracking-wide"
            >
              <span className="mb-2 block">TWITTER</span>

              <input
                type="text"
                placeholder="Pega la URL de tu perfil"
                className="w-full input-primary"
                {...register('twitter', {
                  required: {
                    value: watchContactWay == 'chat-twitter' ? true : false,
                    message: 'Este campo es requerido',
                  },
                  pattern: {
                    value: regexUrl,
                    message: 'Debe ser la url de tu perfil',
                  },
                })}
              />
              {errors.twitter && errors.twitter.message && (
                <p className="mt-1">
                  {errors.twitter && errors.twitter.message}
                </p>
              )}
            </label>
          </div>
          <div className="col-span-6 lg:col-span-4 xl:col-span-3">
            <label
              htmlFor=""
              className="block text-white text-sm  mb-2 tracking-wide"
            >
              <span className="mb-2 block">UBICACIÓN DEL ESTUDIO</span>

              {studioId && (
                <ContactInfoLocation
                  studioId={studioId}
                  studioInfo={studio || null}
                  setLocation={setLocation}
                />
              )}
              {!studioId && <p>Debes terminar el primer paso</p>}
            </label>
          </div>
        </div>

        {location && (
          <ContactInfoMapStudio studioId={studioId} cityLocation={location} />
        )}

        <div className="flex justify-between mt-8">
          {!hasStudio && (
            <p className="text-white">
              Primero debes guardar el Paso 1, Información Personal.
            </p>
          )}
          {hasStudio ? (
            <button
              type="submit"
              className="block  btn-primary py-3 px-5 mb-10"
              disabled={loading}
            >
              Siguiente
            </button>
          ) : (
            <Link href="/studio-account/general">
              <button className="block   btn-primary py-3 px-5">
                Ir al paso 1
              </button>
            </Link>
          )}
        </div>
      </form>
    </div>
  )
}

export default ContactInfoStudio
