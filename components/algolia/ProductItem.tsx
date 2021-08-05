export function ProductItem({ hit, components }) {
  console.log(hit, components, 'esto que es')
  return (
    <a href={hit.url} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle">
          <components.Highlight
            hit={hit}
            attribute={hit.displayName ? 'displayName' : 'studio_name'}
          />
        </div>
      </div>
    </a>
  )
}
