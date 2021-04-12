import Link from 'next/link'

type Props = {
  uid: string
  isArtist: boolean
}

const WorkingInfo = ({ uid, isArtist }: Props) => {
  return (
    <div className="w-4/5 mt-10">
      <h1 className="text-white text-xl sm:text-2xl font-bold  sm:text-left tracking-wide mb-2">
        Información personal
      </h1>

      <form className="mt-10" action="">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label
              htmlFor=""
              className="block text-white text-sm uppercase mb-3 tracking-wide"
            >
              Estilos
            </label>
            <select
              name=""
              id=""
              className="block w-full bg-transparent border-2 border-light-900 text-white p-2 rounded-xl placeholder-light-900 outline-none"
            >
              <option value="" selected>
                Selecciona tus estilos
              </option>
            </select>
          </div>
          <div className="col-span-6 lg:col-span-5 xl:col-span-3">
            <label
              htmlFor=""
              className="block text-white text-sm uppercase mb-3 tracking-wide"
            >
              Estudio donde trabajas
            </label>
            <select
              name=""
              id=""
              className="block w-full bg-transparent border-2 border-light-900 text-white p-2 rounded-xl placeholder-light-900 outline-none"
            >
              <option value="" selected>
                Buscar estudio...
              </option>
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
              name=""
              id=""
              rows={6}
              placeholder="Ej. Lunes a viernes, de 10am - 7pm&#10;Sábados, Domingos y Festivos&#10;10:00am 1:00pm"
              className="w-full bg-transparent border-2 border-light-900 p-2 rounded-xl placeholder-light-900 outline-none resize-none"
            ></textarea>
          </div>
        </div>
      </form>

      {!isArtist && (
        <p className="text-white">
          Para poder completar este paso debes completar la Información personal
        </p>
      )}
      {isArtist ? (
        <button className="block  btn-red py-3 px-5">Siguiente</button>
      ) : (
        <Link href="/artist/main-info">
          <button className="block   btn-red py-3 px-5">Ir al paso 1</button>
        </Link>
      )}
    </div>
  )
}

export default WorkingInfo
