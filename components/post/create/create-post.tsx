import { useState } from 'react'
import Select from 'react-select'
import CreatePostPicture from './create-post-picture'
import { IoMdTabletLandscape, IoMdTabletPortrait } from 'react-icons/io'
import useArtist from 'hooks/use-artist'
import { FaRegSquare, FaTabletAlt } from 'react-icons/fa'
import { BsArrowRight } from 'react-icons/bs'

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
    <div className="bg-dark-800 pt-10 h-3/6 xl:h-screen overflow-auto">
      <div className="container mx-auto flex flex-col xl:flex-row w-4/5 pt-5 md:pt-12 px-0 md:px-10  relative pb-40 md:pb-12 xl:pb-0 mt-8">
        <div className="w-full xl:w-2/3 pr-0 xl:pr-10">
          <CreatePostPicture
            uid={user.uid}
            dataForm={{ description, styles }}
            setWithPicture={setWithPicture}
            pictureSize={pictureSize}
            artist={artist || null}
          />
        </div>

        <div className="w-full xl:w-1/2 text-gray-300 mt-5 md:mt-0">
          <h1 className="text-white text-2xl mb-10">Nueva publicación</h1>
          <label className="flex flex-col mb-5">
            <span className="block mb-2">Descripción corta</span>
            <textarea
              className="input-primary placeholder-light-200 bg-ocean_blue-300 resize-none"
              placeholder="Ej: Gato en sombras, con un toque de puntillismo..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label className="flex flex-col mb-8 xl:mb-80">
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
          <div className="flex gap-4 sm:gap-8 text-white mt-5 xl:mt-32 ml-5 justify-center mb-5">
            <button className="py-3 px-4 focus:outline-none">CANCELAR</button>
            <button className="flex items-center gap-3 py-3 px-5 sm:px-20 bg-primary hover:bg-primaryHover rounded-md focus:outline-none">
              PUBLICAR
              <span className="text-2xl">
                <BsArrowRight />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
