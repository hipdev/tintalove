import { Controller, useForm } from 'react-hook-form'
import Link from 'next/link'
import Select from 'react-select'
import tattooStyles from 'lib/tattoo-styles'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import useArtist from 'hooks/use-artist'
import { updateArtistWorkingInfo } from 'lib/queries/artists'
import { FiHelpCircle } from 'react-icons/fi'
import 'microtip/microtip.css'
import ArtistContactInfoLocation from 'components/artist-account/contact-info/ContactInfoLocation'
import ArtistContactInfoMapStudio from '../contact-info/ContactInfoMap'
import SelectStudio from './SelectStudio'

const options = tattooStyles.map((style) => {
  return { value: style, label: style }
})

const WorkingInfo = ({ uid, isArtist }) => {
  const [studioName, setStudioName] = useState()
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { artist } = useArtist(uid)
  const router = useRouter()

  console.log(studioName, 'nombre del estudio')

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
      styles: [],
      times: artist?.times || '',
      work_as: artist?.work_as || '',
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

      setValue('times', artist.times)
      setValue('work_as', artist.work_as)
      setValue('styles', styles)
    }
  }, [artist])

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => router.push('/artist/contact-info'), 1000)
      return () => clearTimeout(timer)
    }
  }, [success])

  const watchWorkAs = watch('work_as')

  const onSubmit = (data) => {
    setLoading(true)

    toast.promise(updateArtistWorkingInfo(uid, data, true), {
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

  return uid ? (
    <div className="w-full lg:4/5 pr-7 sm:pr-14 mt-10 text-gray-300">
      <h1 className="text-xl sm:text-2xl font-bold  sm:text-left tracking-wide mb-2 text-gray-100">
        Información laboral
      </h1>

      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label className="text-sm mb-3 tracking-wide">
              <div className="flex">
                <span className="mb-3 block uppercase">Estilos</span>
                <span
                  aria-label="En base a ellos te encontrarán y también podrás crear publicaciones asociadas"
                  data-microtip-position="top"
                  role="tooltip"
                >
                  <FiHelpCircle className="text-xl ml-3 cursor-help" />
                </span>
              </div>
              <Controller
                rules={{ required: true }}
                control={control}
                name="styles"
                render={({ field }) => (
                  <Select
                    options={options}
                    isMulti
                    classNamePrefix="create_artist"
                    placeholder="Seleccionar estilos"
                    closeMenuOnSelect={false}
                    {...field}
                  />
                )}
              />
              {errors.styles && <p className="mt-1">Esta campo es requerido</p>}
            </label>
          </div>
          <div className="col-span-6 text-sm mb-3 tracking-wide">
            <span className="mb-3 block"> CÓMO TRABAJAS</span>

            <div className="mb-4">
              <label className="cursor-pointer">
                <input
                  className="form-radio rounded-full text-primary bg-dark-800  focus:ring-0"
                  type="radio"
                  value="freelance"
                  {...register('work_as')}
                />
                <span className="ml-2 mr-4">Soy independiente</span>
              </label>

              <label className="cursor-pointer">
                <input
                  className="form-radio rounded-full text-primary bg-dark-800  focus:ring-0"
                  type="radio"
                  value="partner"
                  {...register('work_as')}
                />
                <span className="ml-2">Trabajo con un estudio</span>
              </label>

              {errors.work_as && <p>Esta campo es requerido</p>}
            </div>

            {watchWorkAs == 'partner' && (
              <div className="mt-7">
                <label className="text-sm mb-3 tracking-wide">
                  <span className="mb-3 flex">
                    SELECCIONA EL ESTUDIO DONDE TRABAJAS
                    <span
                      aria-label="Si no lo encuentras debes registrarlo o solicitar que lo hagan en tu trabajo"
                      data-microtip-position="bottom"
                      role="tooltip"
                    >
                      <FiHelpCircle className="text-xl ml-3 cursor-help" />
                    </span>
                  </span>
                  <SelectStudio
                    state={{ studioName, setStudioName }}
                    artist={artist}
                  />
                </label>
                <div className="mt-3">
                  <p className="flex">
                    ¿Tienes un estudio?{' '}
                    <span
                      aria-label="Registrar un estudio en Tinta Love, es gratis."
                      data-microtip-position="top"
                      role="tooltip"
                    >
                      <FiHelpCircle className="text-xl ml-3 cursor-help" />
                    </span>
                    <Link href="/studio-account/general">
                      <a className="ml-2 text-primary underline">
                        Regístralo aquí
                      </a>
                    </Link>
                  </p>
                </div>
              </div>
            )}

            {watchWorkAs == 'freelance' && (
              <div className="mt-7">
                <label
                  htmlFor=""
                  className="block text-white text-sm  mb-2 tracking-wide"
                >
                  <span className="mb-2 block">UBICACIÓN DEL ESTUDIO</span>

                  {isArtist && (
                    <ArtistContactInfoLocation
                      artistId={uid}
                      artistInfo={artist || null}
                      setLocation={setLocation}
                    />
                  )}
                  {!isArtist && <p>Debes terminar el primer paso</p>}
                </label>
              </div>
            )}
          </div>

          {location && watchWorkAs == 'freelance' && (
            <ArtistContactInfoMapStudio
              studioId={uid}
              cityLocation={location}
            />
          )}

          <div className="col-span-6 mb-6 ">
            <label htmlFor="" className="text-sm tracking-wide">
              <span className="mb-3 block">HORARIOS</span>

              <textarea
                {...register('times', { required: true })}
                rows={6}
                placeholder="Ej. Lunes a viernes, de 10am - 7pm&#10;Sábados, Domingos y Festivos&#10;10:00am 1:00pm"
                className="w-full input-primary resize-none"
              ></textarea>
              {errors.times && <p>Esta campo es requerido</p>}
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
  ) : null
}

export default WorkingInfo
