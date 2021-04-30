import { GoogleMap, LoadScript } from '@react-google-maps/api'

const ContactInfoMapStudio = () => {
  const containerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '4px',
  }

  const center = {
    lat: -3.745,
    lng: -38.523,
  }

  return (
    <div className="w-full mb-10">
      <h2 className="text-lg font-semibold mb-2 mt-7">
        Selecciona la ubicación exacta de tu estudio
      </h2>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  )
}

export default ContactInfoMapStudio
