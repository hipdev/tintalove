import { useState } from 'react'
import Select from 'react-select'
import CreatePostPicture from './create-post-picture'
import { IoMdTabletLandscape, IoMdTabletPortrait } from 'react-icons/io'
import useArtist from 'hooks/use-artist'
import { FaRegSquare, FaTabletAlt } from 'react-icons/fa'

const CreatePost = ({ user }) => {
  const [description, setDescription] = useState('')
  const [styles, setStyles] = useState([])
  const [withPicture, setWithPicture] = useState(false)
  const [pictureSize, setPictureSize] = useState('portrait')

  const { artist } = useArtist(user.uid)

  const options = artist?.styles.map((style) => {
    return { value: style, label: style }
  })

  const handleStyles = (styles) => {
    setStyles(styles)
  }

  return (
    <div className="bg-dark-800 pt-10 pb-48 h-3/6 xl:h-screen">
      <div className="container mx-auto flex flex-col md:flex-row w-4/5 py-5 md:py-12 px-0 md:px-10  relative pb-40 md:pb-12 mt-20">
        <div className="w-full md:w-2/3  pr-0 md:pr-10">
          <CreatePostPicture
            uid={user.uid}
            dataForm={{ description, styles }}
            setWithPicture={setWithPicture}
            pictureSize={pictureSize}
            artist={artist || null}
          />
        </div>

        <div className="w-full md:w-1/3 text-gray-300 mt-5 md:mt-0">
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
            <Select
              options={options}
              isMulti
              classNamePrefix="create_artist"
              placeholder="Seleccionar estilos"
              closeMenuOnSelect={false}
              onChange={handleStyles}
            />
          </label>

          {withPicture && (
            <div className="mt-14 text-center">
              <h2 className="font-semibold text-xl mb-5">
                Orientación de la foto
              </h2>
              <div className="flex justify-around">
                <div
                  className={pictureSize == 'portrait' ? 'text-primary' : ''}
                >
                  <button
                    className="outline-none focus:outline-none relative top-2 hover:text-primary"
                    onClick={() => setPictureSize('portrait')}
                  >
                    <IoMdTabletPortrait className="text-7xl" />
                    <span className="mt-3 block">Retrato</span>
                  </button>
                </div>
                <div
                  className={pictureSize == 'landscape' ? 'text-primary' : ''}
                >
                  <button
                    className="hover:text-primary focus:outline-none"
                    onClick={() => setPictureSize('landscape')}
                  >
                    <IoMdTabletLandscape className="text-7xl" />

                    <span>Paisaje</span>
                  </button>
                </div>
                <div className={pictureSize == 'square' ? 'text-primary' : ''}>
                  <button
                    className="hover:text-primary focus:outline-none relative top-3"
                    onClick={() => setPictureSize('square')}
                  >
                    <FaTabletAlt className="text-7xl" />

                    <span className="block mt-2">Cuadrado</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreatePost
