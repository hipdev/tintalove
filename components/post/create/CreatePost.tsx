import { useState } from 'react'
import Select from 'react-select'
import CreatePostPicture from './CreatePostPicture'
import { IoMdTabletLandscape, IoMdTabletPortrait } from 'react-icons/io'
import useArtist from 'hooks/use-artist'
import { FaRegSquare, FaTabletAlt } from 'react-icons/fa'
import { BsArrowRight } from 'react-icons/bs'
import { BsArrowUp, BsTablet, BsTabletLandscape } from 'react-icons/bs'
import { CgDice1 } from 'react-icons/cg'

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

        <div className="text-gray-300 ">
          {withPicture && (
            <div className="block xl:hidden my-5 text-center">
              <h2 className="font-semibold text-xl mb-5">
                Orientación de la foto
              </h2>
              <div className="flex flex-wrap justify-around">
                <div
                  className={pictureSize == 'portrait' ? 'text-primary' : ''}
                >
                  <button
                    className="w-14 h-14 md:h-0 md:w-48 sm:w-auto flex items-center justify-center gap-3 bg-gr-800 py-6 px-4 rounded-full md:rounded-md focus:outline-none mb-0 xl:mb-5"
                    onClick={() => setPictureSize('portrait')}
                  >
                    <span className="text-2xl">
                      <BsTablet />
                    </span>
                    <span className="hidden md:block">VERTICAL</span>
                  </button>
                </div>
                <div
                  className={pictureSize == 'landscape' ? 'text-primary' : ''}
                >
                  <button
                    className="w-14 h-14 md:h-0 md:w-48 sm:w-auto flex items-center justify-center gap-3 bg-gr-800 py-6 px-4 rounded-full md:rounded-md focus:outline-none mb-0 md:mb-5 mx-2"
                    onClick={() => setPictureSize('landscape')}
                  >
                    <span className="text-2xl">
                      <BsTabletLandscape />
                    </span>
                    <span className="hidden md:block">HORIZONTAL</span>
                  </button>
                </div>
                <div className={pictureSize == 'square' ? 'text-primary' : ''}>
                  <button
                    className="w-14 h-14 md:h-0 md:w-48 sm:w-auto flex items-center justify-center gap-3 bg-gr-800 py-6 px-4 rounded-full md:rounded-md focus:outline-none"
                    onClick={() => setPictureSize('square')}
                  >
                    <span className="text-2xl">
                      <CgDice1 />
                    </span>
                    <span className="hidden md:block">CUADRADA</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col w-full xl:w-1/2 text-gray-300 mt-5 md:mt-0">
          <h1 className="text-white text-2xl mb-10">Nueva publicación</h1>
          <label className="flex flex-col mb-5">
            <span className="block mb-2">Descripción corta</span>
            <textarea
              className="input-primary placeholder-light-200 bg-gr-800 resize-none"
              placeholder="Ej: Gato en sombras, con un toque de puntillismo..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label className="flex flex-col mb-8">
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
            <div className="hidden xl:block mt-14 text-center">
              <h2 className="font-semibold text-xl mb-5">
                Orientación de la foto
              </h2>
              <div className="flex flex-wrap justify-around">
                <div
                  className={pictureSize == 'portrait' ? 'text-primary' : ''}
                >
                  <button
                    className="w-14 h-14 md:h-0 md:w-48 sm:w-auto flex items-center justify-center gap-3 bg-gr-800 py-6 px-4 rounded-full md:rounded-md focus:outline-none mb-0 xl:mb-5"
                    onClick={() => setPictureSize('portrait')}
                  >
                    <span className="text-2xl">
                      <BsTablet />
                    </span>
                    <span className="hidden md:block">VERTICAL</span>
                  </button>
                </div>
                <div
                  className={pictureSize == 'landscape' ? 'text-primary' : ''}
                >
                  <button
                    className="w-14 h-14 md:h-0 md:w-48 sm:w-auto flex items-center justify-center gap-3 bg-gr-800 py-6 px-4 rounded-full md:rounded-md focus:outline-none mb-0 md:mb-5 mx-2"
                    onClick={() => setPictureSize('landscape')}
                  >
                    <span className="text-2xl">
                      <BsTabletLandscape />
                    </span>
                    <span className="hidden md:block">HORIZONTAL</span>
                  </button>
                </div>
                <div className={pictureSize == 'square' ? 'text-primary' : ''}>
                  <button
                    className="w-14 h-14 md:h-0 md:w-48 sm:w-auto flex items-center justify-center gap-3 bg-gr-800 py-6 px-4 rounded-full md:rounded-md focus:outline-none"
                    onClick={() => setPictureSize('square')}
                  >
                    <span className="text-2xl">
                      <CgDice1 />
                    </span>
                    <span className="hidden md:block">CUADRADA</span>
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
