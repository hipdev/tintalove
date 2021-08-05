export function AutocompleteStudioItem({ hit, components }) {
  console.log(hit, components, 'esto que es')
  return (
    <a href={hit.url} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle">
          <components.Highlight hit={hit} attribute={'studio_name'} />
        </div>
      </div>
    </a>
  )
}
