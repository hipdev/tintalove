import SideMenu from '../side-menu'

import 'reactjs-popup/dist/index.css'

import useArtist from 'hooks/use-artist'
import MainInfoForm from './main-info-form'

const MainInfoEdit = ({ uid }) => {
  const { artist } = useArtist(uid)

  return (
    <div className="w-full h-auto bg-gradient-to-r from-dark-700 to-black 2xl:h-screen pt-10 2xl:pt-0">
      <div className="h-full flex flex-col">
        <div className="h-full flex flex-col lg:flex-row justify-evenly items-center">
          <div
            style={{ boxShadow: '1px 0px 5px #000' }}
            className="relative w-10/12 sm:w-2/3  bg-dark-700 bg-opacity-50 rounded-xl p-6 sm:p-12 mb-10 lg:mb-0 h-auto"
          >
            <div>
              <h1 className="text-white text-xl sm:text-2xl font-bold text-center sm:text-left tracking-wide mb-2">
                Información personal
              </h1>
              <p className="text-white mb-5 sm:mb-6 lg:mb-8">
                Gracias por ser parte de la familia Tinta Love, cuando llenes
                todos los pasos aparecerá un botón mágico para activar tu perfil
              </p>

              {artist?.displayName && (
                <MainInfoForm uid={uid} artist={artist} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainInfoEdit
