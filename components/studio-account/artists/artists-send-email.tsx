import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'

const ArtistsSendEmail = () => {
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
    console.log(data, 'data invitation')
    setLoading(true)

    // axios.post('/api/emails/invitation-artist', data).then((res) => {
    //   console.log(res, 'la res')
    // })

    setLoading(false)
  }

  return (
    <div className="mt-12">
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
      <h2 className="text-xl font-semibold">Invitar un artista</h2>
      <p className="mb-5 text-sm text-gray-400">
        Escribe nombre y correo, le enviaremos una invitación para que pueda ser
        parte de tu estudio.
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
              className="input-primary w-full"
              placeholder="Nombre del artista"
              {...register('artist_name')}
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
              {...register('email')}
            />
          </label>
        </div>
        <div className="col-span-2 flex justify-center items-center">
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  )
}

export default ArtistsSendEmail
