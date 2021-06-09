import { getCities } from 'lib/queries/general'
import useSWR from 'swr'
import { UserState } from 'types/user'
import SelectCity from './select-city'

const WrapperSelectCity = ({ user }: { user: UserState }) => {
  const { data } = useSWR(['get-cities', 'Colombia'], getCities)

  if (!data) return <span>...</span>

  return data && <SelectCity user={user} cities={data.cities} />
}

export default WrapperSelectCity
