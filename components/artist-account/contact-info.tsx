import useArtist from 'hooks/use-artist'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const ContactInfo = ({ uid, isArtist }) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { artist } = useArtist(uid)
  const router = useRouter()

  const {
    register,
    setError,
    setValue,
    getValues,
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

  const watchContactWay = watch('contact_way')

  const onSubmit = (data) => {
    console.log(data, 'data form')

    // setLoading(true)
    // if (data.displayName == '' || data.bio == '') {
    //   setLoading(false)
    //   toast('Debes ingresar el nombre y la bio 😓')
    //   return
    // }

    // toast.promise(updateArtistWorkingInfo(uid, data), {
    //   loading: 'Actualizando...',
    //   success: () => {
    //     setLoading(false)
    //     setSuccess(true)

    //     return 'Artista actualizado 😉'
    //   },
    //   error: (err) => {
    //     setLoading(false)
    //     return `${err.toString()}`
    //   },
    // })

    // setLoading(false)
  }

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
                <option value="" selected>
                  Selecciona por favor
                </option>
                <option value="direct-call" selected>
                  Llamada directa
                </option>
                <option value="whatsapp" selected>
                  WhatsApp
                </option>
                <option value="telegram" selected>
                  Telegram
                </option>
                <option value="chat-instagram" selected>
                  Chat de Instagram
                </option>
              </select>
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
                    {...field}
                  />
                )}
              />
            </label>
          </div>
          <div className="col-span-6 md:col-span-5 xl:col-span-2 mb-4 xl:mb-24">
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
                  required: watchContactWay == 'chat-instagram' ? true : false,
                })}
              />
            </label>
          </div>
          <div className="col-span-6 md:col-span-5 xl:col-span-2 mb-4 xl:mb-24">
            <label
              htmlFor=""
              className="block text-white text-sm  mb-3 tracking-wide"
            >
              <span className="mb-3 block">FACEBOOK</span>

              <input
                type="text"
                placeholder="Pega la URL de tu perfil"
                className="w-full input-primary"
                {...register('facebook')}
              />
            </label>
          </div>
          <div className="col-span-6 md:col-span-5 xl:col-span-2 mb-4 xl:mb-24">
            <label
              htmlFor=""
              className="block text-white text-sm  mb-3 tracking-wide"
            >
              <span className="mb-3 block">TWITTER</span>

              <input
                type="text"
                placeholder="Pega la URL de tu perfil"
                className="w-full input-primary"
                {...register('twitter')}
              />
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
              className="block  btn-red py-3 px-5"
              disabled={loading}
            >
              Siguiente
            </button>
          ) : (
            <Link href="/artist/main-info">
              <button className="block   btn-red py-3 px-5">
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
