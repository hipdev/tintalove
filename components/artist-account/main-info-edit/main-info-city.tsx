import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import useOnclickOutside from 'react-cool-onclickoutside'
import useScript from 'hooks/use-script'

const MainInfoCity = () => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: ['CO'] },
      types: ['(cities)'],
    },
    debounce: 300,
    callbackName: 'initMap',
  })

  const statusMap = useScript(
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyA5drETj_sJmO1kGEDEb7tXWzwJb05ipCY&libraries=places&callback=initMap'
  )

  // const ref = useOnclickOutside(() => {
  //   // When user clicks outside of the component, we can dismiss
  //   // the searched suggestions by calling this method
  //   clearSuggestions()
  // })

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value)
  }

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false)
    clearSuggestions()

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('📍 Coordinates: ', { lat, lng })
      })
      .catch((error) => {
        console.log('😱 Error: ', error)
      })
  }

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion

      return (
        <li
          className="px-2 py-2 hover:bg-dark-700 cursor-pointer"
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      )
    })

  return (
    // <div ref={ref}>
    <div className="relative">
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Busca tu ciudad"
        className="input-primary w-full"
        spellCheck="false"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === 'OK' && (
        <ul className="bg-dark-800 absolute w-full">{renderSuggestions()}</ul>
      )}
    </div>
  )
}

export default MainInfoCity
