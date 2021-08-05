import { getAlgoliaResults } from '@algolia/autocomplete-js'
import algoliasearch from 'algoliasearch/lite'

import '@algolia/autocomplete-theme-classic'
import AutocompleteStudio from './AutocompleteStudio'
import { AutocompleteStudioItem } from './AutocompleteStudioItem'

const appId = 'JE20HAUJXG'
const apiKey = 'db9dbba9f07212053022eec3e364876a'
const searchClient = algoliasearch(appId, apiKey)

const SelectStudio = ({ state, artist }) => {
  return (
    <div>
      <AutocompleteStudio
        defaultState={state.studioName?.studio_name}
        openOnFocus={true}
        debug={true}
        getSources={(props) => {
          // console.log(props, 'props de getSources')
          return [
            {
              sourceId: 'studios',
              getItems() {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: 'tintalove_studios',
                      query: props.query,
                      params: {
                        hitsPerPage: 4,
                      },
                    },
                  ],
                })
              },
              templates: {
                item({ item, components }) {
                  return (
                    <AutocompleteStudioItem
                      hit={item}
                      components={components}
                      setStudioName={state.setStudioName}
                      artist={artist}
                    />
                  )
                },
                footer() {
                  return (
                    <div className="flex justify-end mt-4">
                      <img
                        src="/algolia.png"
                        alt="Algolia Logo"
                        className="h-5"
                      />
                    </div>
                  )
                },
                noResults() {
                  return 'Ups, este estudio no esta registrado'
                },
              },
            },
          ]
        }}
      />
    </div>
  )
}

export default SelectStudio
