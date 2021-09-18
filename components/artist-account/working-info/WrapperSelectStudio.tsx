import { getStudiosFilter } from 'lib/queries/studios'
import useSWR from 'swr'
import SelectStudio from './SelectStudio'

const WrapperSelectStudio = ({ state, artist, setErrorRequest }) => {
  const { data: studios } = useSWR(['getStudiosFilter'], getStudiosFilter)

  if (!studios) return <span>...</span>

  return (
    studios.length > 0 && (
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
