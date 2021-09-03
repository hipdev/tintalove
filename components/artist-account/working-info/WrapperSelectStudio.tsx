import { getArtistsFilter } from 'lib/queries/artists'
import useSWR from 'swr'
import SelectStudio from './SelectStudio'

const WrapperSelectStudio = ({ state, artist, setErrorRequest }) => {
  const { data: studios } = useSWR(['getArtistsFilter'], getArtistsFilter)

  if (!studios) return <span>...</span>

  return (
    studios.length > 1 && (
      <SelectStudio
        studios={studios}
        state={state}
        artist={artist}
        setErrorRequest={setErrorRequest}
      />
    )
  )
}

export default WrapperSelectStudio
