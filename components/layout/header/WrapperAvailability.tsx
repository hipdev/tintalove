import { getArtistAvailability } from 'lib/queries/artists'
import useSWR from 'swr'
import { UserState } from 'types/user'
import Availability from './availability'

const WrapperAvailability = ({ user }: { user: UserState }) => {
  const { data }: any = useSWR(
    user.uid ? ['get-availability', user.uid] : null,
    getArtistAvailability
  )

  if (!data) return <span>...</span>

  return <Availability user={user} availableId={data?.available_id} />
}

export default WrapperAvailability
