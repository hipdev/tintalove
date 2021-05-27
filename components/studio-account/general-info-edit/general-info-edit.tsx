import useStudio from 'hooks/use-studio'
import GeneralInfoform from './general-info-form'

const MainInfoEdit = ({ studioId, uid }) => {
  const { studio } = useStudio(studioId)

  return (
    <div className="w-full lg:w-4/5 mt-10 pr-7 sm:pr-14">
      <h1 className="text-white text-xl sm:text-2xl font-bold  sm:text-left tracking-wide mb-2">
        Información general
      </h1>
      <p className="text-white mb-5 sm:mb-6 lg:mb-8">
        Al terminar todos los pasos aparecerá un boton para activar tu estudio
        en Tinta Love.
      </p>

      {studio?.studio_name && (
        <GeneralInfoform studioId={studioId} studio={studio} uid={uid} />
      )}
    </div>
  )
}

export default MainInfoEdit
