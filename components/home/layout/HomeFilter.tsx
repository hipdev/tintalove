import { getAlgoliaResults } from '@algolia/autocomplete-js'
import algoliasearch from 'algoliasearch/lite'
import { ProductItem } from 'components/algolia/ProductItem'
import '@algolia/autocomplete-theme-classic'
import AutocompleteStudio from 'components/artist-account/working-info/AutocompleteStudio'

const appId = 'JE20HAUJXG'
const apiKey = 'db9dbba9f07212053022eec3e364876a'
const searchClient = algoliasearch(appId, apiKey)

const SelectStudio = () => {
  return (
    <div>
      <AutocompleteStudio
        openOnFocus={true}
        getSources={({ query }) => [
          {
            sourceId: 'studios',
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: 'tintalove_studios',
                    query,
                  },
                  {
                    indexName: 'tintalove_artists',
                    query,
                  },
                ],
              })
            },
            templates: {
              item({ item, components }) {
                return <ProductItem hit={item} components={components} />
              },
              footer() {
                return 'soy el pie'
              },
              noResults() {
                return 'Sin resultados'
              },
            },
          },
        ]}
      />
    </div>
  )
}

export default SelectStudio
