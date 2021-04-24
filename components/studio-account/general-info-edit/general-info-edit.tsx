import useArtist from 'hooks/use-artist'
import MainInfoForm from './general-info-form'

const MainInfoEdit = ({ uid }) => {
  const { artist } = useArtist(uid)

  return (
    <div className="w-4/5 mt-10">
      <h1 className="text-white text-xl sm:text-2xl font-bold  sm:text-left tracking-wide mb-2">
        Información general
      </h1>
      <p className="text-white mb-5 sm:mb-6 lg:mb-8">
        Gracias por ser parte de la familia Tinta Love, cuando llenes todos los
        pasos aparecerá un botón mágico para activar tu perfil
      </p>

      {artist?.displayName && <MainInfoForm uid={uid} artist={artist} />}
    </div>
  )
}

export default MainInfoEdit