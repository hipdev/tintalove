import { getAlgoliaResults } from '@algolia/autocomplete-js'
import algoliasearch from 'algoliasearch'
import { Autocomplete } from 'components/algolia/autocomplete'
import { ProductItem } from 'components/algolia/product-item'
import '@algolia/autocomplete-theme-classic'

const appId = 'JE20HAUJXG'
const apiKey = 'db9dbba9f07212053022eec3e364876a'
const searchClient = algoliasearch(appId, apiKey)

const HomeFilter = () => {
  return (
    <div className="relative h-1/4 flex flex-col justify-center items-center mt-24">
      <div className="mb-10">
        <img src="/newlogo.png" className="w-72" />
      </div>
      <div className="relative w-full md:w-2/4 lg:w-2/5 xl:w-2/6 flex justify-center items-center mb-6 px-3">
        <Autocomplete
          // openOnFocus={true}
          placeholder="ENCUENTRA TATUAJES Y ARTISTAS INCREÍBLES"
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
      </div>
    </div>
  )
}

export default HomeFilter
