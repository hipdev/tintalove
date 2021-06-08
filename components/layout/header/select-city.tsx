import { getCities } from 'lib/queries/general'
import useSWR from 'swr'

const SelectCity = () => {
  const { data } = useSWR(['get-cities', 'Colombia'], getCities)

  if (!data) return <span>...</span>

  return (
    data && (
      <select
        name=""
        className="bg-transparent text-white font-light font-raleway underline focus:outline-none"
      >
        <option value="">TODO COLOMBIA</option>
        {data.cities.map((city) => {
          console.log(city, 'la ciudad')
          return (
            <option key={city.city_hash} value={city.city_hash}>
              {city.city_name}
            </option>
          )
        })}
      </select>
    )
  )
}

export default SelectCity
