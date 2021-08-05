export function AutocompleteStudioItem({ hit, components, setStudioName }) {
  // console.log(hit, components, 'esto que es')
  return (
    <button
      className="aa-ItemLink flex h-full"
      onClick={() => {
        setStudioName({ studio_id: hit.objectID, studio_name: hit.studio_name })
      }}
    >
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle">
          <components.Highlight hit={hit} attribute={'studio_name'} />
        </div>
      </div>
    </button>
  )
}
