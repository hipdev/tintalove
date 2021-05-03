import { autocomplete } from '@algolia/autocomplete-js'
import { createElement, Fragment, useEffect, useRef } from 'react'
import { render } from 'react-dom'

export function Autocomplete(props) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) {
      return undefined
    }

    const search = autocomplete({
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

  return <div className="w-full rounded-none" ref={containerRef} />
}
