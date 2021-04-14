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
    watch,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      styles: [],
      times: '',
      workAs: '',
    },
  })

  const watchWorkAs = watch('workAs')

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
              {errors.styles && <p>Esta campo es requerido</p>}
            </label>
          </div>
          <div className="col-span-6">
            <span className="mb-3 block"> CÓMO TRABAJAS</span>

            <div className="mb-4">
              <label className="cursor-pointer">
                <input
                  className="form-radio rounded-full text-primary bg-dark-800  focus:ring-0"
                  type="radio"
                  value="independent"
                  {...register('workAs')}
                />
                <span className="ml-2 mr-4">Soy independiente</span>
              </label>

              <label className="cursor-pointer">
                <input
                  className="form-radio rounded-full text-primary bg-dark-800  focus:ring-0"
                  type="radio"
                  value="company"
                  {...register('workAs')}
                />
                <span className="ml-2">Trabajo con un estudio</span>
              </label>

              {errors.workAs && <p>Esta campo es requerido</p>}
            </div>

            {watchWorkAs == 'company' && (
              <label className="text-sm mb-3 tracking-wide">
                <span className="mb-3 block">
                  SELECCIONA EL ESTUDIO DONDE TRABAJAS
                </span>
                <select className="input-primary w-full" defaultValue="">
                  <option value="">Buscar estudio...</option>
                </select>
              </label>
            )}
          </div>
          <div className="col-span-6 mb-6">
            <div className="flex justify-between items-center mb-3">
              <label htmlFor="" className="text-sm uppercase tracking-wide">
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
