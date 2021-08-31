import { updateArtistContactInfo } from 'lib/queries/artists'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiHelpCircle } from 'react-icons/fi'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import 'microtip/microtip.css'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaFacebookF, FaTelegramPlane, FaTwitter } from 'react-icons/fa'
import { ArtistTypes } from 'types/artist'
import { checkUrl } from 'lib/utils'

const ContactInfo = ({ uid, artist }: { uid: string; artist: ArtistTypes }) => {
  const [mobile, setPhone]: any = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

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
      instagram: null,
      facebook: null,
      twitter: null,
      telegram_user: null,
    },
  })

  const watchContactWay = watch('contact_way')
  const watchInstagram = watch('instagram')
  const watchFacebook = watch('facebook')
  const watchTwitter = watch('twitter')
  const watchTelegram = watch('telegram_user')

  console.log(artist, 'artist info')

  useEffect(() => {
    if (artist) {
      let styles = []
      if (artist.styles) {
        styles = artist.styles.map((style) => ({
          label: style,
          value: style,
        }))
      }

      setValue('contact_way', artist.contact_way || null)
      setPhone(
        {
          value: artist?.mobile?.value,
          country_code: artist?.mobile?.country_code,
        } || null
      )
      setValue('instagram', artist.instagram || null)
      setValue('facebook', artist.facebook || null)
      setValue('twitter', artist.twitter || null)
      setValue('telegram_user', artist.telegram_user || null)
    }
  }, [artist, setValue])

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => router.push('/artist/pictures-info'), 1000)
      return () => clearTimeout(timer)
    }
  }, [success, router])

  const onSubmit = (data) => {
    setLoading(true)

    const dataForm = { ...data, mobile }

    if (mobile?.value && mobile.value.length > 9) {
      console.log(dataForm, 'form to send')
      toast.promise(updateArtistContactInfo(uid, dataForm, artist), {
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
    } else {
      toast.error('Debes agregar el teléfono')
    }

    setLoading(false)
  }

  return (
    <div className="w-4/5 mt-10 text-gray-300">
      <h1 className="text-xl sm:text-2xl font-bold  sm:text-left tracking-wide mb-2 text-gray-100">
        Información de Contacto
      </h1>

      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 lg:col-span-4 xl:col-span-3">
            <label
              htmlFor=""
              className="block text-white text-sm  mb-3 tracking-wide"
            >
              <div className="flex">
                <span className="mb-3 block uppercase">
                  POR DÓNDE QUIERES QUE TE CONTACTEN
                </span>
                <span
                  aria-label="De acuerdo a tu selección, TintaLove direccionará al usuario"
                  data-microtip-position="top"
                  role="tooltip"
                >
                  <FiHelpCircle className="text-xl ml-3 cursor-help" />
                </span>
              </div>

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
              <span className="mb-3 block">CELULAR</span>

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
                  setPhone({
                    value: '+' + value,
                    country_code: country.countryCode.toUpperCase(),
                  })
                }}
                value={mobile.value}
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
                {(watchInstagram || artist?.instagram) && (
                  <a
                    href={checkUrl(
                      watchInstagram || artist?.instagram,
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
                {(watchFacebook || artist?.facebook) && (
                  <a
                    href={checkUrl(
                      watchFacebook || artist?.facebook,
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

                {(watchTwitter || artist?.twitter) && (
                  <a
                    href={checkUrl(
                      watchTwitter || artist?.twitter,
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

          {(watchContactWay == 'telegram' || artist?.telegram_user) && (
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

                  {(watchTelegram || artist?.telegram_user) && (
                    <a
                      href={checkUrl(
                        watchTelegram || artist?.telegram_user,
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
        </div>

        <div className="flex justify-between">
          {!artist && (
            <p>Primero debes guardar el Paso 1, Información Personal.</p>
          )}
          {artist ? (
            <button
              type="submit"
              className="block  btn-primary py-3 px-5"
              disabled={loading}
            >
              Siguiente
            </button>
          ) : (
            <Link href="/artist/main-info">
              <a>
                <button className="block   btn-primary py-3 px-5">
                  Ir al paso 1
                </button>
              </a>
            </Link>
          )}
        </div>
      </form>
    </div>
  )
}

export { checkUrl }

export default ContactInfo
