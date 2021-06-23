import useArtist from 'hooks/use-artist'
import { updateArtistContactInfo } from 'lib/queries/artists'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiFacebook, FiHelpCircle } from 'react-icons/fi'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import 'microtip/microtip.css'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaFacebookF, FaTwitter } from 'react-icons/fa'

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
      instagram: null,
      facebook: null,
      twitter: null,
    },
  })

  const watchContactWay = watch('contact_way')
  const watchInstagram = watch('instagram')
  const watchFacebook = watch('facebook')
  const watchTwitter = watch('twitter')

  const regexUrl = new RegExp(
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
  )

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
      setValue('phone', artist.phone || null)
      setValue('instagram', artist.instagram || null)
      setValue('facebook', artist.facebook || null)
      setValue('twitter', artist.twitter || null)
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

  const checkUrl = (url, website) => {
    const isLink = regexUrl.test(url)
    if (isLink) {
      return url
    } else {
      return `${website}/${url}`
    }
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
            <label htmlFor="" className="block  text-sm mb-3 tracking-wide">
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
                    placeholder="Selecciona primero el país"
                    {...field}
                  />
                )}
              />
              {errors.phone && <p className="mt-1">Esta campo es requerido</p>}
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
              {errors.facebook && errors.facebook.message && (
                <p className="mt-1">
                  {errors.facebook && errors.facebook.message}
                </p>
              )}
            </label>
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
                {errors.twitter && errors.twitter.message && (
                  <p className="mt-1">
                    {errors.twitter && errors.twitter.message}
                  </p>
                )}
              </div>
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          {!isArtist && (
            <p>Primero debes guardar el Paso 1, Información Personal.</p>
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

export default ContactInfo
