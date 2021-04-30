import useArtist from 'hooks/use-artist'
import { updateArtistContactInfo } from 'lib/db'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const ContactInfo = ({ uid, isArtist }) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { artist } = useArtist(uid)
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

  useEffect(() => {
    if (artist) {
      let styles = []
      if (artist.styles) {
        styles = artist.styles.map((style) => ({
          label: style,
          value: style,
        }))
      }

      setValue('contact_way', artist.contact_way)
      setValue('phone', artist.phone)
      setValue('instagram', artist.instagram)
      setValue('facebook', artist.facebook)
      setValue('twitter', artist.twitter)
    }
  }, [artist])

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => router.push('/artist/pictures-info'), 1000)
      return () => clearTimeout(timer)
    }
  }, [success])

  const watchContactWay = watch('contact_way')

  const onSubmit = (data) => {
    setLoading(true)

    toast.promise(updateArtistContactInfo(uid, data, true), {
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

  console.log(errors, 'errores del form')

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

      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 lg:col-span-4 xl:col-span-3">
            <label
              htmlFor=""
              className="block text-white text-sm  mb-3 tracking-wide"
            >
              <span className="mb-3 block">
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
<<<<<<< HEAD
                <option value="instagram">Instagram</option>
=======
                <option value="chat-instagram">Instagram</option>
>>>>>>> 502c34386c89b544bc110502b46bba092e122f3a
                <option value="chat-facebook">Facebook</option>
                <option value="chat-twitter">Twitter</option>
              </select>
              {errors.contact_way && (
                <p className="mt-1">Esta campo es requerido</p>
              )}
            </label>
          </div>
          <div className="col-span-6 lg:col-span-4 xl:col-span-3">
            <label
              htmlFor=""
              className="block text-white text-sm mb-3 tracking-wide"
            >
              <span className="mb-3 block">NÚMERO</span>

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
              className="block text-white text-sm  mb-3 tracking-wide"
            >
              <span className="mb-3 block">INSTAGRAM</span>

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
                    value: new RegExp(
                      '^https?://[w-]+(.[w-]+)+[/#?]?.*$',
                      'gm'
                    ),
<<<<<<< HEAD
                    message: 'Debe ser una url',
=======
                    message: 'Debe ser la url de tu perfil',
>>>>>>> 502c34386c89b544bc110502b46bba092e122f3a
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
              className="block text-white text-sm  mb-3 tracking-wide"
            >
              <span className="mb-3 block">FACEBOOK</span>

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
                    value: new RegExp(
                      '^https?://[w-]+(.[w-]+)+[/#?]?.*$',
                      'gm'
                    ),
<<<<<<< HEAD
                    message: 'Debe ser una url',
=======
                    message: 'Debe ser la url de tu perfil',
>>>>>>> 502c34386c89b544bc110502b46bba092e122f3a
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
              className="block text-white text-sm  mb-3 tracking-wide"
            >
              <span className="mb-3 block">TWITTER</span>

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
                    value: new RegExp(
                      '^https?://[w-]+(.[w-]+)+[/#?]?.*$',
                      'gm'
                    ),
<<<<<<< HEAD
                    message: 'Debe ser una url',
=======
                    message: 'Debe ser la url de tu perfil',
>>>>>>> 502c34386c89b544bc110502b46bba092e122f3a
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
        </div>
        <div className="flex justify-between">
          {!isArtist && (
            <p className="text-white">
              Primero debes guardar el Paso 1, Información Personal.
            </p>
          )}
          {isArtist ? (
            <button
              type="submit"
              className="block  btn-primary py-3 px-5"
              disabled={loading}
            >
              Siguiente
            </button>
          ) : (
            <Link href="/artist/main-info">
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

export default ContactInfo
