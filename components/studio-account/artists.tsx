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

const Artists = ({ uid, isArtist }) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { artist } = useArtist(uid)
  const router = useRouter()

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
      times: artist?.times || '',
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
      setValue('styles', styles)
    }
  }, [artist])

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => router.push('/artist/contact-info'), 1000)
      return () => clearTimeout(timer)
    }
  }, [success])

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
        Artistas
      </h1>

      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl font-semibold">Invitar un artista</h2>
        <p className="mb-5 text-sm">
          Escribe el nombre y correo, le enviaremos una invitación para que
          pueda ser parte de tu estudio
        </p>
        <div className="grid grid-cols-10 gap-6 mb-5">
          <div className="col-span-4">
            <label className="text-sm mb-3 tracking-wide">
              <span className="mb-3 block">NOMBRE</span>
              <input
                type="text"
                className="input-primary w-full"
                placeholder="Nombre del artista"
              />
            </label>
          </div>
          <div className="col-span-4">
            <label className="text-sm mb-3 tracking-wide">
              <span className="mb-3 block">EMAIL</span>
              <input
                type="text"
                className="input-primary w-full"
                placeholder="Email del artista"
              />
            </label>
          </div>
          <div className="flex justify-end">
            <button>Enviar</button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold"> Artistas actuales</h2>
        </div>

        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-3">
            <label className="text-sm mb-3 tracking-wide">
              <span className="mb-3 block"> ESTILOS QUE OFRECEN </span>

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

          <div className="col-span-3 mb-6 ">
            <label htmlFor="" className="text-sm tracking-wide">
              <span className="mb-3 block">HORARIOS DEL ESTUDIO</span>

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

export default Artists