import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { FiAlertCircle, FiCheckCircle, FiHelpCircle } from 'react-icons/fi'

const MainInfoAvailable = ({ validUserName, availableUserName }) => {
  return (
    <>
      {validUserName ? (
        <div>
          {availableUserName ? (
            <div className="flex items-center">
              <span className="flex items-center">
                Esta disponible!
                <FiCheckCircle className="ml-1 text-2xl text-green-500" />
              </span>
              <Popup
                trigger={
                  <span>
                    <FiHelpCircle className="text-xl ml-3 cursor-help" />
                  </span>
                }
                on={['hover', 'focus']}
                position="right center"
              >
                <div className="text-sm">Así te encontrarán en TintaLove</div>
              </Popup>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="flex items-center">
                No disponible
                <FiAlertCircle className="ml-1 text-2xl text-red-500" />
              </span>
              <Popup
                trigger={
                  <span>
                    <FiHelpCircle className="text-xl ml-3 cursor-help" />
                  </span>
                }
                on={['hover', 'focus']}
                position="right center"
              >
                <div className="text-sm">
                  Intenta con otro usuario en el cuadro de abajo.
                </div>
              </Popup>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center">
          <span>Formato inválido</span>
          <Popup
            trigger={
              <span>
                <FiHelpCircle className="text-xl ml-3 cursor-help" />
              </span>
            }
            on={['hover', 'focus']}
            position="right center"
            keepTooltipInside=".tooltipBox"
          >
            <div className="text-sm">
              Intenta con otro nombre de usuario, puedes usar letras, números.
              También _ y . pero no seguidos o al final del usuario
            </div>
          </Popup>
        </div>
      )}
    </>
  )
}

export default MainInfoAvailable
