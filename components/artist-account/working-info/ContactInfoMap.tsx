import { GoogleMap, Marker } from '@react-google-maps/api'
import { updateArtistLocationMarker } from 'lib/queries/artists'
import toast from 'react-hot-toast'
import { mutate } from 'swr'

const ArtistContactInfoMapStudio = ({ cityLocation, artistId }) => {
  const containerStyle = {
    width: '100%',
    height: '500px',
    borderRadius: '4px',
  }

  const handleNewLocation = async (data) => {
    const own_studio_marker = [data.latLng.lat(), data.latLng.lng()]

    toast.promise(updateArtistLocationMarker(artistId, own_studio_marker), {
      loading: 'Actualizando...',
      success: () => {
        mutate(['getArtistFullInfo', artistId])
        return 'Marker actualizado 😎'
      },
      error: (err) => {
        return `${err.toString()}`
      },
    })
  }

  return (
    <div className="w-full mb-10 col-span-6">
      <h2 className="text-lg font-semibold mb-2 mt-7">
        Selecciona la ubicación exacta de tu estudio
      </h2>
      <p className="text-gray-300 text-sm mb-5">
        Puedes seleccionar con mas precisión la ubicación del estudio, Tinta
        Love les indicará a tus clientes como llegar con Waze o Google Maps.
      </p>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={cityLocation}
        zoom={18}
      >
        <Marker
          position={cityLocation}
          draggable
          onDragEnd={handleNewLocation}
        />
      </GoogleMap>
    </div>
  )
}

export default ArtistContactInfoMapStudio
