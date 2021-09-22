import { ArtistTypes } from 'types/artist'
import { UserState } from 'types/user'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import toast from 'react-hot-toast'
import {
  addArtistToFavorites,
  deleteFavoriteArtist,
  isArtistFavorite,
} from 'lib/queries/artists'
import useSWR from 'swr'

const PostArtistFavorite = ({
  artistData,
  user,
}: {
  artistData: ArtistTypes
  user: UserState
}) => {
  const { data: favoriteId, mutate } = useSWR(
    ['isArtistFavorite', artistData.id, user?.id],
    isArtistFavorite
  )

  const handleFavoriteArtist = async () => {
    if (!user?.id) {
      toast.error('Debes entrar para agregar favoritos')
      return
    }
    toast.promise(addArtistToFavorites(artistData.id, user?.id), {
      loading: 'Añadiendo...',
      success: () => {
        mutate()
        return 'Artista añadido 😉'
      },
      error: (err) => {
        return `${err.toString()}`
      },
    })
  }

  const handleDeleteFavoriteArtist = async (favoriteId) => {
    toast.promise(deleteFavoriteArtist(favoriteId), {
      loading: 'Eliminando...',
      success: () => {
        mutate()
        return 'Artista eliminado '
      },
      error: (err) => {
        return `${err.toString()}`
      },
    })
  }

  console.log(favoriteId, 'datos favoritos')

  if (favoriteId) {
    return (
      <button
        className="bg-gr-800 ml-4 rounded-full p-2 border border-gr-600"
        onClick={() => handleDeleteFavoriteArtist(favoriteId)}
      >
        <BsHeartFill
          className="text-2xl hover:text-primary text-gn-400  relative top-0.5"
          title="Eliminar de favoritos"
        />
      </button>
    )
  }

  return (
    <button
      className="bg-gr-800 ml-4 rounded-full p-2 border border-gr-600"
      onClick={handleFavoriteArtist}
    >
      <BsHeart className="text-2xl hover:text-primary text-gn-400 animate-pulse relative top-0.5" />
    </button>
  )
}

export default PostArtistFavorite
