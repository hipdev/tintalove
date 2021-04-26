const ArtistsSendEmail = () => {
  return (
    <>
      <h2 className="text-xl font-semibold">Invitar un artista</h2>
      <p className="mb-5 text-sm">
        Escribe nombre y correo, le enviaremos una invitación para que pueda ser
        parte de tu estudio.
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
    </>
  )
}

export default ArtistsSendEmail
