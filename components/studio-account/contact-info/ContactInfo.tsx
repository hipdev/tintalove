import useStudio from 'hooks/use-studio'
import { updateStudioContactInfo } from 'lib/queries/studios'
import { checkUrl } from 'lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaFacebookF, FaTelegramPlane, FaTwitter } from 'react-icons/fa'
import { FiHelpCircle } from 'react-icons/fi'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import ContactInfoLocation from './ContactInfoLocation'
import ContactInfoMapStudio from './ContactInfoMap'

const ContactInfoStudio = ({ studioId, hasStudio }) => {
  const [phone, setPhone]: any = useState({})
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
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      contact_way: '',
      instagram: '',
      facebook: '',
      twitter: '',
      telegram_user: '',
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
      setValue('instagram', studio.instagram)
      setValue('facebook', studio.facebook)
      setValue('twitter', studio.twitter)
      setValue('telegram_user', studio.telegram_user)
      setPhone(
        { value: studio.phone, country_code: studio.country_code } || null
      )
    }
  }, [studio])

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => router.push('/studio/pictures-info'), 1000)
      return () => clearTimeout(timer)
    }
  }, [success])

  const watchContactWay = watch('contact_way')
  const watchInstagram = watch('instagram')
  const watchFacebook = watch('facebook')
  const watchTwitter = watch('twitter')
  const watchTelegram = watch('telegram_user')

  const onSubmit = (data) => {
    setLoading(true)

    const dataForm = { ...data, phone }

    toast.promise(updateStudioContactInfo(studioId, dataForm, true), {
      loading: 'Actualizando...',
      success: () => {
        setLoading(false)
        setSuccess(true)

        return 'Estudio actualizado 😉'
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
                <option value="direct_call">Llamada directa</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="telegram">Telegram</option>
              </select>
              {errors.contact_way && (
                <p className="mt-1">Esta campo es requerido</p>
              )}
            </label>
          </div>
          <div className="col-span-6 lg:col-span-4 xl:col-span-3">
            <label htmlFor="" className="block  text-sm mb-3 tracking-wide">
              <span className="mb-3 block">NÚMERO</span>

              <PhoneInput
                country={'co'}
                copyNumbersOnly={false}
                preferredCountries={[
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
                placeholder="Selecciona primero el país"
                onChange={(value, country: any, e, formattedValue) => {
                  console.log(
                    value,
                    country,
                    e,
                    formattedValue,
                    'los valores del input'
                  )

                  setPhone({
                    value: '+' + value,
                    country_code: country.countryCode.toUpperCase(),
                  })
                }}
                value={phone.value}
              />
            </label>
          </div>

          <div className="col-span-6 lg:col-span-4 xl:col-span-3">
            <label htmlFor="" className="block  text-sm  mb-3 tracking-wide">
              <span className="mb-3 block">INSTAGRAM</span>

              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Pega la URL de tu perfil o tu nombre de usuario"
                  className="w-full input-primary"
                  {...register('instagram', {
                    required: {
                      value: watchContactWay == 'chat-instagram' ? true : false,
                      message: 'Este campo es requerido',
                    },
                  })}
                />
                {(watchInstagram || studio?.instagram) && (
                  <a
                    href={checkUrl(
                      watchInstagram || studio?.instagram,
                      'https://instagram.com'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiOutlineInstagram className="text-2xl ml-4" />
                  </a>
                )}
              </div>

              {errors.instagram && errors.instagram.message && (
                <p className="mt-1">
                  {errors.instagram && errors.instagram.message}
                </p>
              )}
            </label>
          </div>

          <div className="col-span-6 lg:col-span-4 xl:col-span-3">
            <label htmlFor="" className="block  text-sm  mb-3 tracking-wide">
              <span className="mb-3 block">FACEBOOK</span>

              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Pega la URL de tu perfil"
                  className="w-full input-primary"
                  {...register('facebook', {
                    required: {
                      value: watchContactWay == 'facebook' ? true : false,
                      message: 'Este campo es requerido',
                    },
                  })}
                />
                {(watchFacebook || studio?.facebook) && (
                  <a
                    href={checkUrl(
                      watchFacebook || studio?.facebook,
                      'https://facebook.com'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookF className="text-2xl ml-4" />
                  </a>
                )}
              </div>
            </label>
            {errors.facebook && errors.facebook.message && (
              <p className="mt-1">
                {errors.facebook && errors.facebook.message}
              </p>
            )}
          </div>

          <div className="col-span-6 lg:col-span-4 xl:col-span-3">
            <label htmlFor="" className="block  text-sm  mb-3 tracking-wide">
              <span className="mb-3 block">TWITTER</span>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Pega la URL de tu perfil"
                  className="w-full input-primary"
                  {...register('twitter', {
                    required: {
                      value: watchContactWay == 'twitter' ? true : false,
                      message: 'Este campo es requerido',
                    },
                  })}
                />

                {(watchTwitter || studio?.twitter) && (
                  <a
                    href={checkUrl(
                      watchTwitter || studio?.twitter,
                      'https://twitter.com'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter className="text-2xl ml-4" />
                  </a>
                )}
              </div>
              {errors.twitter && errors.twitter.message && (
                <p className="mt-1">
                  {errors.twitter && errors.twitter.message}
                </p>
              )}
            </label>
          </div>

          {(watchContactWay == 'telegram' || studio?.telegram_user) && (
            <div className="col-span-6 lg:col-span-4 xl:col-span-3">
              <label htmlFor="" className="block  text-sm  mb-3 tracking-wide">
                <div className="flex">
                  <span className="mb-3 block uppercase">Telegram</span>
                  <span
                    aria-label="Debes tener un usuario de Telegram, ve a la app y crea uno si no lo tienes."
                    data-microtip-position="top"
                    role="tooltip"
                  >
                    <FiHelpCircle className="text-xl ml-3 cursor-help" />
                  </span>
                </div>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Agrega tu usuario de Telegram"
                    className="w-full input-primary"
                    {...register('telegram_user', {
                      required: {
                        value: watchContactWay == 'telegram' ? true : false,
                        message: 'Este campo es requerido',
                      },
                    })}
                  />

                  {(watchTelegram || studio?.telegram_user) && (
                    <a
                      href={checkUrl(
                        watchTelegram || studio?.telegram_user,
                        'https://t.me'
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTelegramPlane className="text-2xl ml-4" />
                    </a>
                  )}
                </div>
                {errors.telegram_user && errors.telegram_user.message && (
                  <p className="mt-1">
                    {errors.telegram_user && errors.telegram_user.message}
                  </p>
                )}
              </label>
            </div>
          )}

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
