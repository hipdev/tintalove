import usePlacesAutocomplete, {
  getDetails,
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import useOnclickOutside from 'react-cool-onclickoutside'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import {
  updateArtistLocation,
  updateArtistLocationMarker,
} from 'lib/queries/artists'
import { updateStudioLocationMarker } from 'lib/queries/studios'

const ArtistContactInfoLocation = ({ setLocation, artistId, artistInfo }) => {
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
      // types: ['(cities)'],
    },
    debounce: 300,
    // callbackName: 'initMap',
    defaultValue: '',
  })

  useEffect(() => {
    if (artistInfo?.dataLocation) {
      setPlaceholder(artistInfo?.dataLocation.formatted_address)
      setLocation(
        {
          lat: artistInfo?.dataMarker?.marker_location[0],
          lng: artistInfo?.dataMarker?.marker_location[1],
        } || {
          lat: artistInfo?.dataLocation?.coordinates.lat,
          lng: artistInfo?.dataLocation?.coordinates.lng,
        }
      )
      setValue(artistInfo.dataLocation.formatted_address)
    }
  }, [artistInfo])

  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions()
  })

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value)
  }

  const handleSelect = (placeData) => async () => {
    //pedir explicación aquí a lucho
    // // When user selects a place, we can replace the keyword without request data from API
    // // by setting the second parameter to "false"
    setValue(placeData.description, false)
    clearSuggestions()
    setPlaceholder(placeData.description)

    // Get latitude and longitude via utility functions
    const results: any = await getGeocode({ address: placeData.description })

    const { lat, lng }: any = await getLatLng(results[0])

    setLocation({ lat, lng })

    const dataLocation = {
      place_id: results[0].place_id,
      formatted_address: results[0].formatted_address,
      coords: `${lat}, ${lng}`, // type point()
      lat,
      lng,
    }

    toast.promise(updateArtistLocation(artistId, dataLocation), {
      loading: 'Actualizando...',
      success: () => {
        return 'Ubicacion actualizada 😉'
      },
      error: (err) => {
        return `${err.toString()}`
      },
    })

    // const marker_location = [lat, lng]
    // const marker_hash = geohashForLocation(marker_location)

    // const dataMarker = {
    //   marker_location,
    //   marker_hash,
    // }

    // toast.promise(updateArtistLocationMarker(artistId, dataMarker), {
    //   loading: 'Actualizando...',
    //   success: () => {
    //     return 'Marker actualizado 📍'
    //   },
    //   error: (err) => {
    //     return `${err.toString()}`
    //   },
    // })
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
            : ''
            ? ''
            : 'Buscar ubicación, puedes agregar una dirección exacta'
        }
        className="input-primary w-full"
        spellCheck="false"
        required
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === 'OK' && (
        <ul className="bg-dark-800 absolute w-full z-10">
          {renderSuggestions()}
        </ul>
      )}
    </div>
  )
}

export default ArtistContactInfoLocation
