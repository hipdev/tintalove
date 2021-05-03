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
    <div>
      <div className="w-full  bg-dark-800 relative">
        <div className="px-5 container mx-auto rounded-sm relative -top-52 bg-list-home">
          <ArtistList artists={artists} />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center h-72 sm:h-80">
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
