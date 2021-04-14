import { Controller, useForm } from 'react-hook-form'
import Link from 'next/link'
import Select from 'react-select'
import tattooStyles from 'lib/tattoo-styles'

const options = tattooStyles.map((style) => {
  return { value: style, label: style }
})

const WorkingInfo = ({ uid, isArtist }) => {
  const {
    register,
    setError,
    getValues,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      styles: [],
      times: '',
    },
  })

  const onSubmit = (data) => {
    console.log(data, 'data form')

    // setLoading(true)
    // if (data.displayName == '' || data.bio == '') {
    //   setLoading(false)
    //   toast('Debes ingresar el nombre y la bio 😓')
    //   return
    // }

    // if (
    //   !placeInfo &&
    //   data.displayName == artist.displayName &&
    //   data.bio == artist.bio
    // ) {
    //   cityRef.current.focus()
    //   setLoading(false)
    //   toast('😓 Debes indicar al menos una ciudad, nombre o biografía')
    //   return
    // }

    // let formData = { bio: data.bio, displayName: data.displayName }
    // if (placeInfo) formData = { ...placeInfo, ...formData }

    // toast.promise(updateArtistMainInfo(uid, formData), {
    //   loading: 'Actualizando...',
    //   success: (data) => {
    //     setLoading(false)
    //     setTriggerAuth(Math.random()) // reload global user state data
    //     router.push('/artist/working-info')
    //     return 'Artista actualizado 😉'
    //   },
    //   error: (err) => {
    //     setLoading(false)
    //     return `${err.toString()}`
    //   },
    // })

    // setLoading(false)
  }

  return uid ? (
    <div className="w-4/5 mt-10">
      <h1 className="text-white text-xl sm:text-2xl font-bold  sm:text-left tracking-wide mb-2">
        Información personal
      </h1>

      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label
              htmlFor=""
              className="block text-white text-sm uppercase mb-3 tracking-wide"
            >
              Estilos
            </label>

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
            {errors.styles && <p>Esta campo es requerido</p>}
          </div>
          <div className="col-span-6 lg:col-span-5 xl:col-span-3">
            <label
              htmlFor=""
              className="block text-white text-sm uppercase mb-3 tracking-wide"
            >
              Estudio donde trabajas
            </label>

            <select
              className="block w-full bg-transparent border-2 border-light-900 text-white p-2 rounded-xl placeholder-light-900 outline-none"
              defaultValue=""
            >
              <option value="">Buscar estudio...</option>
            </select>
          </div>
          <div className="col-span-6 mb-6">
            <div className="flex justify-between items-center mb-3">
              <label
                htmlFor=""
                className="block text-white text-sm uppercase tracking-wide"
              >
                Horarios
              </label>
              <span className="text-white">0/100</span>
            </div>
            <textarea
              {...register('times', { required: true })}
              rows={6}
              placeholder="Ej. Lunes a viernes, de 10am - 7pm&#10;Sábados, Domingos y Festivos&#10;10:00am 1:00pm"
              className="w-full bg-transparent border-2 border-light-900 p-2 rounded-xl placeholder-light-900 outline-none resize-none"
            ></textarea>
            {errors.times && <p>Esta campo es requerido</p>}
          </div>
        </div>

        {!isArtist && (
          <p className="text-white">
            Para poder completar este paso debes completar la Información
            personal
          </p>
        )}
        {isArtist ? (
          <button type="submit" className="block  btn-red py-3 px-5">
            Siguiente
          </button>
        ) : (
          <Link href="/artist/main-info">
            <button className="block   btn-red py-3 px-5">Ir al paso 1</button>
          </Link>
        )}
      </form>
    </div>
  ) : null
}

export default WorkingInfo
