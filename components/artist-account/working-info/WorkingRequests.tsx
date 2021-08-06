import { getArtistRequests } from 'lib/queries/artists'
import useSWR from 'swr'

const WorkingRequests = ({ artistId }) => {
  const { data } = useSWR(['getArtistRequests', artistId], getArtistRequests)
  console.log(data, 'Solicitudes del artista')
  return (
    <div className="mt-5">
      <h2 className="font-semibold uppercase">Solicitudes actuales</h2>
    </div>
  )
}

export default WorkingRequests
