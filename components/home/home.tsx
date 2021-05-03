import Link from 'next/link'
import { FiPlus } from 'react-icons/fi'
import { GoSearch } from 'react-icons/go'
import { getAlgoliaResults } from '@algolia/autocomplete-js'
import algoliasearch from 'algoliasearch'
import ArtistList from './artist-list'
import { Autocomplete } from 'components/algolia/autocomplete'
import { ProductItem } from 'components/algolia/product-item'
import '@algolia/autocomplete-theme-classic'

const appId = 'JE20HAUJXG'
const apiKey = 'db9dbba9f07212053022eec3e364876a'
const searchClient = algoliasearch(appId, apiKey)

const Home = ({ artists }) => {
  return (
    <div className="w-full h-auto bg-black">
      <div className="h-1/4 flex flex-col justify-center items-center bg-gradient-to-r from-dark-800  to-black">
        <h1 className="w-11/12 xl:w-2/5 text-white text-center text-4xl sm:text-5xl font-bold font-raleway leading-tight mt-20 sm:mt-24 mb-10">
          Artistas altamente creativos y profesionales
        </h1>
        <div className="relative w-full md:w-2/4 lg:w-2/5 xl:w-2/6 flex justify-center items-center mb-6 px-3">
          <div className="absolute left-3 flex items-center pointer-events-none p-3">
            <span className="text-black text-xl sm:text-2xl">
              <GoSearch />
            </span>
          </div>

          <Autocomplete
            // openOnFocus={true}
            placeholder="Busca tatuajes, artistas..."
            getSources={({ query }) => [
              {
                sourceId: 'artists',
                getItems() {
                  return getAlgoliaResults({
                    searchClient,
                    queries: [
                      {
                        indexName: 'tintalove_dev',
                        query,
                      },
                    ],
                  })
                },
                templates: {
                  item({ item, components }) {
                    return <ProductItem hit={item} components={components} />
                  },
                },
              },
            ]}
          />
          {/* <input
            type="text"
            placeholder="Busca tatuajes o artistas"
            className="w-full py-3 pl-12 md:pl-14 rounded-l-lg focus:outline-none placeholder-black"
          /> */}

          <button
            type="submit"
            className="text-white bg-primary px-5 py-3 rounded-r-lg focus:outline-none tracking-wide"
          >
            Buscar
          </button>
        </div>
        <div className="w-full flex flex-wrap justify-center items-center mb-16 sm:mb-24">
          <Link href="/">
            <a className="inline-block text-white bg-dark-700 px-4 py-2 mr-3 rounded-full mb-2">
              Estilos
            </a>
          </Link>
          <Link href="/">
            <a className="inline-block text-white bg-dark-700 px-4 py-2 mr-3 rounded-full mb-2">
              Sombras
            </a>
          </Link>
          <Link href="/">
            <a className="inline-block text-white bg-dark-700 px-4 py-2 mr-3 rounded-full mb-2">
              Color
            </a>
          </Link>
          <Link href="/">
            <a className="inline-block text-white bg-dark-700 px-4 py-2 mr-3 rounded-full mb-2">
              Puntos
            </a>
          </Link>
          <Link href="/">
            <a className="inline-block text-2xl text-white bg-dark-700 p-2 rounded-full mb-2">
              <FiPlus />
            </a>
          </Link>
        </div>
      </div>
      <div className="px-5 container mx-auto">
        <ArtistList artists={artists} />
      </div>
      <div className="flex h-609 mt-20">
        <div className="flex flex-col justify-center w-full lg:w-3/4 bg-dark-700 pl-10 sm:pl-20 xl:pl-32 pr-20 py-8">
          <p className="text-red-600 font-raleway mb-2">
            La nueva manera de encontrar artistas en Colombia
          </p>
          <h1 className="text-4xl xl:text-5xl text-white font-bold font-raleway mb-10 tracking-wide">
            Fácil, Rápido y Confiable
          </h1>
          <div className="flex space-x-6 mb-4 sm:mb-20">
            <img
              src="https://via.placeholder.com/45x57"
              alt=""
              className="flex-shrink-0 h-20"
            />
            <div>
              <p className="font-raleway text-white w-auto sm:w-60 mb-5">
                Busca entre cientos de artistas y estilos disponibles
              </p>
              <div className="w-20 border-b-2 border-red-600"></div>
            </div>
          </div>
          <div className="flex self-start sm:self-center lg:self-start space-x-6 mb-4 sm:mb-20">
            <img
              src="https://via.placeholder.com/45x57"
              alt=""
              className="flex-shrink-0 h-20"
            />
            <div>
              <p className="font-raleway text-white w-auto sm:w-60 mb-5">
                Encuentra el artista idóneo para el diseño que quieres
              </p>
              <div className="w-20 border-b-2 border-red-600"></div>
            </div>
          </div>
          <div className="flex self-start sm:self-end lg:self-start space-x-6">
            <img
              src="https://via.placeholder.com/45x57"
              alt=""
              className="flex-shrink-0 h-20"
            />
            <div>
              <p className="font-raleway text-white w-auto sm:w-48 mb-5">
                Agenda tu cita y listo! Comparte tu tatuaje
              </p>
              <div className="w-20 border-b-2 border-red-600"></div>
            </div>
          </div>
        </div>
        <div className="w-full h-full hidden lg:block">
          <img
            src="https://via.placeholder.com/786x610"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center h-72 sm:h-80 mt-16">
        <div className="flex flex-col items-center text-center px-3 sm:px-0">
          <h1 className="text-4xl sm:text-5xl text-white font-bold font-raleway mb-2">
            ¿Eres un artista?
          </h1>
          <p className="text-light-700 text-center mb-5">
            Únete a nuestra plataforma y se encontrado por clientes potenciales
          </p>
          <button className="text-white bg-red-600 font-raleway px-4 py-2 rounded-lg">
            Regístrate
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
