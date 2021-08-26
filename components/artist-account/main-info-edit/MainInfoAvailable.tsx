import { FiAlertCircle, FiCheckCircle, FiHelpCircle } from 'react-icons/fi'

const MainInfoAvailable = ({ validUserName, availableUserName }) => {
  return (
    <>
      {validUserName != null && (
        <>
          {validUserName ? (
            <div>
              {availableUserName ? (
                <div className="flex items-center">
                  <span className="flex items-center">
                    Esta disponible!
                    <FiCheckCircle className="ml-1 text-2xl text-green-500" />
                  </span>
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="flex items-center">
                    No disponible
                    <FiAlertCircle className="ml-1 text-2xl text-red-500" />
                  </span>

                  <span
                    aria-label="Intenta con otro usuario en el cuadro de abajo."
                    data-microtip-position="bottom"
                    data-microtip-size="medium"
                    role="tooltip"
                  >
                    <FiHelpCircle className="text-xl ml-3 cursor-help" />
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center">
              <span>Formato inválido</span>

              <span
                aria-label="Intenta con otro nombre de usuario, puedes usar letras, números.
              También _ y . pero no seguidos o al final del usuario"
                data-microtip-position="bottom"
                data-microtip-size="medium"
                role="tooltip"
              >
                <FiHelpCircle className="text-xl ml-3 cursor-help" />
              </span>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default MainInfoAvailable
