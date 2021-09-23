import { getMultipleStudiosInfo } from 'lib/queries/studios'
import Select from 'react-select'
import useSWR from 'swr'

const SelectStudioToPost = ({ artist, setStudio }) => {
  const { data: studios } = useSWR(
    ['getMultipleStudiosInfo', artist?.id],
    getMultipleStudiosInfo
  )

  const optionsStudios = studios.map((studio: any) => {
    return { value: studio.id, label: studio.name }
  })

  return (
    <label className="flex flex-col mb-8">
      <span className="block mb-2">Estudio dónde lo realizaste</span>

      <Select
        options={optionsStudios}
        classNamePrefix="create_artist"
        placeholder="Seleccionar estudio"
        closeMenuOnSelect={false}
        onChange={(value) => setStudio(value)}
      />
    </label>
  )
}

export default SelectStudioToPost
