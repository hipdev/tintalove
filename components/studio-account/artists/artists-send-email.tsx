import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'

const ArtistsSendEmail = ({ studioInfo }) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      artist_name: '',
      email: '',
    },
  })

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => router.push('/artist/contact-info'), 1000)
      return () => clearTimeout(timer)
    }
  }, [success])

  const onSubmit = (data) => {
    setLoading(true)

    axios.post('/api/emails/invitation-artist', data).then((res) => {
      if (res?.status == 200) {
        reset()
        toast('Notificación enviada satisfactoriamente a ' + data.artist_name)
      }
    })

    setLoading(false)
  }

  return (
    <div className="mt-12">
      <Toaster
        toastOptions={{
          className: 'bg-primary',
          style: {
            background: '#158e72',
            border: 'none',
            borderRadius: '3px',
            color: '#fff',
          },
          duration: 5000,
        }}
        position="bottom-right"
      />
      <h2 className="text-xl font-semibold">Invitar un artista</h2>
      {studioInfo?.studio_active ? (
        <>
          <p className="mb-5 text-sm text-gray-400">
            Escribe nombre y correo, le enviaremos una invitación para que pueda
            ser parte de tu estudio.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-10 gap-6 mb-5"
          >
            <div className="col-span-4">
              <label className="text-sm mb-3 tracking-wide">
                <span className="mb-3 block">NOMBRE</span>
                <input
                  type="text"
                  autoComplete="off"
                  className="input-primary w-full"
                  placeholder="Nombre del artista"
                  {...register('artist_name', { required: true })}
                />
                {errors.artist_name && (
                  <p className="mt-2">Esta campo es requerido</p>
                )}
              </label>
            </div>
            <div className="col-span-4">
              <label className="text-sm mb-3 tracking-wide">
                <span className="mb-3 block">EMAIL</span>
                <input
                  type="email"
                  autoComplete="off"
                  className="input-primary w-full"
                  placeholder="Email del artista"
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <p className="mt-2">Esta campo es requerido</p>
                )}
              </label>
            </div>
            <div className="col-span-2 flex justify-center items-center">
              <button type="submit">Enviar</button>
            </div>
          </form>
        </>
      ) : (
        <p className="text-gray-300 mt-4">
          Al activar tu estudio podrás enviar invitaciones a artistas, regresa
          aquí cuando hayas llenado todos los pasos.
        </p>
      )}
    </div>
  )
}

export default ArtistsSendEmail
