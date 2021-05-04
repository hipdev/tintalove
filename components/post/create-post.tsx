import { useState } from 'react'
import CreatePostPicture from './create-post-picture'

const CreatePost = ({ uid }) => {
  const [description, setDescription] = useState('')
  const [styles, setStyles] = useState('')

  return (
    <div className="bg-dark-800 pt-10 pb-48 h-3/6">
      <div className="bg-dark-500 container mx-auto flex w-4/5 py-12 px-10  ">
        <div className="w-2/3 pr-10">
          <CreatePostPicture uid={uid} dataForm={{ description, styles }} />
        </div>

        <div className="w-1/3 text-gray-300">
          <label className="flex flex-col mb-5">
            <span className="block mb-2">Descripción corta</span>
            <textarea
              className="input-primary"
              placeholder="Ej: Gato en sombras, con un toque de puntillismo..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label className="flex flex-col">
            <span className="block mb-2">Estilos usados</span>
            <input
              className="input-primary"
              type="text"
              placeholder="Ej: Gato en sombras, con un toque de color..."
              value={styles}
              onChange={(e) => setStyles(e.target.value)}
            />
          </label>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
