import { useState } from 'react'
import Select from 'react-select'
import CreatePostPicture from './create-post-picture'
import { IoMdTabletLandscape, IoMdTabletPortrait } from 'react-icons/io'
import useArtist from 'hooks/use-artist'
import Artists from 'components/studio-account/artists/artists'

const CreatePost = ({ uid }) => {
  const [description, setDescription] = useState('')
  const [styles, setStyles] = useState([])
  const [withPicture, setWithPicture] = useState(false)
  const [isPortrait, setIsPortrait] = useState(true)

  const { artist } = useArtist(uid)

  const options = artist?.styles.map((style) => {
    return { value: style, label: style }
  })

  const handleStyles = (styles) => {
    setStyles(styles)
  }

  return (
    <div className="bg-dark-800 pt-10 pb-48 h-3/6 xl:h-screen ">
      <div className="bg-dark-500 container mx-auto flex flex-col md:flex-row  w-4/5 xl:w-3/5  py-5 md:py-12 px-5 md:px-10  relative pb-40 md:pb-12">
        <div className="w-full md:w-2/3  pr-0 md:pr-10">
          <CreatePostPicture
            uid={uid}
            dataForm={{ description, styles }}
            setWithPicture={setWithPicture}
            isPortrait={isPortrait}
            artist={artist || null}
          />
        </div>

        <div className="w-full md:w-1/3 text-gray-300">
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
                <div className={isPortrait ? 'text-primary' : ''}>
                  <button
                    className="outline-none focus:outline-none relative top-3 hover:text-primary"
                    onClick={() => setIsPortrait(true)}
                  >
                    <IoMdTabletPortrait className="text-7xl" />
                    <span className="mt-3 block">Retrato</span>
                  </button>
                </div>
                <div className={!isPortrait ? 'text-primary' : ''}>
                  <button
                    className="hover:text-primary focus:outline-none"
                    onClick={() => setIsPortrait(false)}
                  >
                    <IoMdTabletLandscape className="text-8xl" />

                    <span>Paisaje</span>
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
