export function ProductItem({ hit, components }) {
  console.log(hit, components, 'searching')
  return (
    <a href={hit.url} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle">
          <components.Highlight hit={hit} attribute="displayName" />
        </div>
      </div>
    </a>
  )
}
