import { Controller, useForm } from 'react-hook-form'
import Link from 'next/link'
import Select from 'react-select'
import tattooStyles from 'lib/tattoo-styles'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { updateArtistWorkingInfo } from 'lib/db'
import { useRouter } from 'next/router'
import useArtist from 'hooks/use-artist'

const options = tattooStyles.map((style) => {
  return { value: style, label: style }
})

const WorkingInfo = ({ uid, isArtist }) => {
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

  console.log(artist, 'artist Info')

  const watchWorkAs = watch('work_as')

  const onSubmit = (data) => {
    console.log(data, 'data form')

    setLoading(true)
    if (data.displayName == '' || data.bio == '') {
      setLoading(false)
      toast('Debes ingresar el nombre y la bio 😓')
      return
    }

    toast.promise(updateArtistWorkingInfo(uid, data), {
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
        Información personal
      </h1>

      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label className="text-sm mb-3 tracking-wide">
              <span className="mb-3 block"> ESTILOS</span>

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
                  value="independent"
                  {...register('work_as')}
                />
                <span className="ml-2 mr-4">Soy independiente</span>
              </label>

              <label className="cursor-pointer">
                <input
                  className="form-radio rounded-full text-primary bg-dark-800  focus:ring-0"
                  type="radio"
                  value="company"
                  {...register('work_as')}
                />
                <span className="ml-2">Trabajo con un estudio</span>
              </label>

              {errors.work_as && <p>Esta campo es requerido</p>}
            </div>

            {watchWorkAs == 'company' && (
              <div className="mt-7">
                <label className="text-sm mb-3 tracking-wide">
                  <span className="mb-3 block">
                    SELECCIONA EL ESTUDIO DONDE TRABAJAS
                  </span>
                  <input
                    className="input-primary w-full"
                    placeholder="Buscar estudio"
                  />
                </label>
                <div className="mt-1">
                  <p>
                    ¿No encuentras tu estudio?
                    <Link href="#">
                      <a className="ml-2 text-primary underline">
                        Regístralo aquí
                      </a>
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>
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
  ) : null
}

export default WorkingInfo
