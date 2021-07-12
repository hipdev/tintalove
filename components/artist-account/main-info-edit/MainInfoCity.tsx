import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import useOnclickOutside from 'react-cool-onclickoutside'
import { useState } from 'react'
import { geohashForLocation } from 'geofire-common'

const MainInfoCity = ({ defaultValue, setPlaceInfo }) => {
  const [placeholder, setPlaceholder] = useState('')

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
    defaultValue: defaultValue,
  })

  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions()
  })

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value)
  }

  const handleSelect =
    ({ description }) =>
    async () => {
      //pedir explicación aquí a lucho
      // // When user selects a place, we can replace the keyword without request data from API
      // // by setting the second parameter to "false"
      setValue(description, false)
      clearSuggestions()
      setPlaceholder(description)

      // Get latitude and longitude via utility functions
      const results = await getGeocode({ address: description })

      const { lat, lng }: any = await getLatLng(results[0])

      console.log(lat, lng, 'los lat y long')

      const cityHash = geohashForLocation([lat, lng])

      const fullAddress = results[0].formatted_address.split(',')
      const city_name = fullAddress[0]
      const province = fullAddress[1].trim() || ''
      const country = (fullAddress[2] && fullAddress[2].trim()) || 'Colombia'

      setPlaceInfo({
        place_id: results[0].place_id,
        formatted_address: results[0].formatted_address,
        city_name,
        _geoloc: {
          lat,
          lng,
        },
        geohash: cityHash,
        province,
        country,
      })

      // getGeocode()
      //   .then((results) => getLatLng(results[0]))
      //   .then(({ lat, lng }) => {

      //     console.log('📍 Coordinates: ', { lat, lng })

      //   })
      //   .catch((error) => {
      //     console.log('😱 Error: ', error)
      //   })
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
    <div className="relative" ref={ref}>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder={
          placeholder
            ? placeholder
            : defaultValue
            ? defaultValue
            : 'Busca tu ciudad'
        }
        className="input-primary w-full"
        spellCheck="false"
        onFocus={() => setValue('')}
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === 'OK' && (
        <ul className="bg-dark-800 absolute w-full">{renderSuggestions()}</ul>
      )}
    </div>
  )
}

export default MainInfoCity
