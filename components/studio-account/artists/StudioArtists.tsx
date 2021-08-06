import { Controller, useForm } from 'react-hook-form'
import Link from 'next/link'
import Select from 'react-select'
import tattooStyles from 'lib/tattoo-styles'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { useRouter } from 'next/router'

import ArtistsSendEmail from './ArtistsSendEmail'
import ArtistsAccountList from './ArtistsList'
import useStudio from 'hooks/use-studio'
import { updateStudioArtists } from 'lib/queries/studios'

const options = tattooStyles.map((style) => {
  return { value: style, label: style }
})

const StudioArtists = ({ uid, studioId, hasStudio }) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const { studio } = useStudio(studioId)

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      styles: [],
      times: studio?.times || '',
    },
  })

  useEffect(() => {
    if (studio) {
      let styles = []
      if (studio.styles) {
        styles = studio.styles.map((style) => ({
          label: style,
          value: style,
        }))
      }

      setValue('times', studio.times)
      setValue('styles', styles)
    }
  }, [studio])

  useEffect(() => {
    if (success) {
      const timer = setTimeout(
        () => router.push('/studio-account/contact-info'),
        1000
      )
      return () => clearTimeout(timer)
    }
  }, [success])

  const onSubmit = (data) => {
    setLoading(true)

    toast.promise(updateStudioArtists(studioId, data, true), {
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

  return uid ? (
    <div className="w-5/5 mt-10 pr-10 text-gray-200">
      <h1 className="text-xl sm:text-2xl font-bold  sm:text-left tracking-wide">
        Artistas
      </h1>

      <ArtistsAccountList studio={studio} />

      <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-4">
            <label className="text-sm mb-3 tracking-wide">
              <span className="mb-3 block">
                {' '}
                ESTILOS QUE OFRECEN EN EL ESTUDIO{' '}
              </span>

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

          <div className="col-span-2 mb-6 ">
            <label htmlFor="" className="text-sm tracking-wide">
              <span className="mb-3 block">HORARIOS DEL ESTUDIO</span>

              <textarea
                {...register('times', { required: true })}
                rows={4}
                placeholder="Ej. Lunes a viernes, de 10am - 7pm&#10;Sábados, Domingos y Festivos&#10;10:00am 1:00pm"
                className="w-full input-primary resize-none"
              ></textarea>
              {errors.times && <p>Esta campo es requerido</p>}
            </label>
          </div>
        </div>

        <div className="flex justify-between">
          {!hasStudio && (
            <p className="text-white">
              Primero debes guardar el Paso 1, Información general.
            </p>
          )}
          {hasStudio ? (
            <button
              type="submit"
              className="block  btn-primary py-3 px-5"
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

      <ArtistsSendEmail studioInfo={studio} />
    </div>
  ) : null
}

export default StudioArtists
