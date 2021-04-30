import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const ContactInfoMapStudio = ({ cityLocation }) => {
  const containerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '4px',
  }

  const onLoad = (marker) => {
    console.log('marker: ', marker)
  }

  return (
    <div className="w-full mb-10">
      <h2 className="text-lg font-semibold mb-2 mt-7">
        Selecciona la ubicación exacta de tu estudio
      </h2>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={cityLocation}
        zoom={10}
      >
        <Marker onLoad={onLoad} position={cityLocation} draggable />
      </GoogleMap>
    </div>
  )
}

export default ContactInfoMapStudio
