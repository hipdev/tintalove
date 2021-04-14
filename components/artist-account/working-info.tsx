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

  console.log(uid, 'el user id ')

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
              <div className="mt-7">
                <label className="text-sm mb-3 tracking-wide">
                  <span className="mb-3 block">
                    SELECCIONA EL ESTUDIO DONDE TRABAJAS
                  </span>
                  <select
                    className="input-primary w-full text-sm mb-3 tracking-wide"
                    defaultValue=""
                  >
                    <option value="">Buscar estudio...</option>
                  </select>
                </label>
                <div>
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
            <button type="submit" className="block  btn-red py-3 px-5">
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
