import { updateUserName } from 'lib/queries/users'
import { url_domain } from 'lib/utils'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { BsPhone } from 'react-icons/bs'
import { UserState } from 'types/user'

const UserImageProfile = ({ user }: { user: UserState }) => {
  const [name, setName] = useState(
    user?.displayName == 'Sin nombre' ? '' : user?.displayName
  )
  const [loading, setLoading] = useState(false)
  console.log(user)

  const userImage = url_domain(user?.photoUrl || null)

  const handleName = () => {
    setLoading(true)

    if (name != '') {
      toast.promise(updateUserName(user?.uid, name), {
        loading: 'Actualizando...',
        success: () => {
          setLoading(false)

          return 'Nombre actualizado 😉'
        },
        error: (err) => {
          setLoading(false)
          return `${err.toString()}`
        },
      })
    } else {
      toast.error('Debes ingresar tu nombre')
    }
  }

  return (
    <div className="flex text-gray-400 container mx-auto mt-20 w-full px-5 sm:px-10 lg:px-20">
      <div className="mr-20 w-1/4 flex flex-col bg-gr-700 p-5 rounded-sm">
        <img
          src={
            userImage == 'ik.imagekit.io'
              ? `${user?.photoUrl}/tr:pr-true,c-at_max,f-auto,w-50,q-90`
              : userImage == 'lh3.googleusercontent.com'
              ? user?.photoUrl
              : '/user-green.png'
          }
          className="object-cover px-2 mb-7"
        />
        <label className="flex flex-col">
          <span>Tu nombre</span>
          <input
            placeholder="Indica tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <h2>{user?.email ? 'Correo' : 'Celular'}</h2>
        <p>{user?.email ? user?.email : user?.phoneNumber}</p>

        <button
          onClick={handleName}
          className="uppercase bg-primary px-3 py-2 text-gray-200 rounded-sm text-sm font-semibold flex"
        >
          Guardar cambios
          <BsPhone className="text-xl ml-3 mr-2" />
          {loading && (
            <svg
              className="block animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </button>
      </div>

      <div className="flex flex-col w-3/4">
        <div>
          <h3>Colecciones</h3>
          <div>item</div>
          <div>item</div>
          <div>item</div>
        </div>
        <div>
          <h3>Tatuadores</h3>
          <div>item</div>
          <div>item</div>
          <div>item</div>
        </div>
        <div>
          <h3>Estudios </h3>
          <div>item</div>
          <div>item</div>
          <div>item</div>
        </div>
      </div>
    </div>
  )
}

export default UserImageProfile
