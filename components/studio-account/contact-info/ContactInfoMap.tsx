import { GoogleMap, Marker } from '@react-google-maps/api'
import { updateStudioLocationMarker } from 'lib/queries/studios'
import toast from 'react-hot-toast'

const ContactInfoMapStudio = ({ cityLocation, studioId }) => {
  const containerStyle = {
    width: '100%',
    height: '500px',
    borderRadius: '4px',
  }

  const handleNewLocation = async (data) => {
    const dataMarker = [data.latLng.lat(), data.latLng.lng()]

    toast.promise(updateStudioLocationMarker(studioId, dataMarker), {
      loading: 'Actualizando...',
      success: () => {
        return 'Ubicación actualizada 😉'
      },
      error: (err) => {
        return `${err.toString()}`
      },
    })
  }

  return (
    <div className="w-full mb-10">
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

export default ContactInfoMapStudio
