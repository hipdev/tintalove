import { autocomplete } from '@algolia/autocomplete-js'
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches'

import { createElement, Fragment, useEffect, useRef } from 'react'
import { render } from 'react-dom'

const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: 'RECENT_SEARCH',
  limit: 5,
})

const AutocompleteStudio = (props) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) {
      return undefined
    }

    const search = autocomplete({
      initialState: {
        query: props.defaultState || '',
      },

      // detachedMediaQuery: '',
      translations: {
        detachedCancelButtonText: 'Cancelar',
        submitButtonTitle: 'Enviar',
      },
      // onSubmit: (state) => {
      //   console.log(state, 'enviado')
      // },

      placeholder: props.defaultState || 'Buscar estudio',
      classNames: {
        root: 'au-studio',
        panel: 'au-studio',
        detachedContainer: 'au-studio',
      },
      plugins: [recentSearchesPlugin],

      container: containerRef.current,
      renderer: { createElement, Fragment },

      render({ children }: any, root) {
        render(children, root)
      },

      ...props,
    })

    return () => {
      search.destroy()
    }
  }, [props])

  return <div className="w-full rounded-none " ref={containerRef} />
}

export default AutocompleteStudio
