import { sendArtistWorkRequest } from 'lib/queries/artists'
import toast from 'react-hot-toast'
import { ArtistTypes } from 'types/artist'

type Props = {
  hit?: any
  components: any
  setStudioName: any
  artist: ArtistTypes
}

export function AutocompleteStudioItem({
  hit,
  components,
  setStudioName,
  artist,
}: Props) {
  const sendArtistRequest = async () => {
    setStudioName({ studio_id: hit.objectID, studio_name: hit.studio_name })
    console.log(hit, artist, 'data to send')
    toast.promise(sendArtistWorkRequest(hit, artist), {
      loading: 'Enviando...',
      success: () => {
        return 'Solicitud enviada 😉'
      },
      error: (err) => {
        return `${err.toString()}`
      },
    })
  }
  // console.log(hit, components, 'esto que es')
  return (
    <button className="aa-ItemLink flex h-full" onClick={sendArtistRequest}>
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle">
          <components.Highlight hit={hit} attribute={'studio_name'} />
        </div>
      </div>
    </button>
  )
}