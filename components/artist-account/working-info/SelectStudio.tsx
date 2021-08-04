import { getAlgoliaResults } from '@algolia/autocomplete-js'
import algoliasearch from 'algoliasearch/lite'
import { Autocomplete } from 'components/algolia/autocomplete'
import { ProductItem } from 'components/algolia/ProductItem'
import '@algolia/autocomplete-theme-classic'

const appId = 'JE20HAUJXG'
const apiKey = 'db9dbba9f07212053022eec3e364876a'
const searchClient = algoliasearch(appId, apiKey)

const SelectStudio = (props) => {
  return (
    <div>
      <Autocomplete
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
    </div>
  )
}

export default SelectStudio
