import { GoogleMap, LoadScript } from '@react-google-maps/api'

const ContactInfoMapStudio = () => {
  const containerStyle = {
    width: '400px',
    height: '400px',
  }

  const center = {
    lat: -3.745,
    lng: -38.523,
  }

  return (
    <div>
      <h2>Selecciona la ubicación exacta de tu estudio</h2>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  )
}

export default ContactInfoMapStudio
