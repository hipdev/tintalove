import Layout from 'components/layout/layout'
import useUser from 'hooks/use-user'

export default function IsAuth({ children }) {
  const { state } = useUser()

  console.log(state, 'auth state')

  return (
    <>
      {state.user ? (
        children
      ) : (
        <div className="h-screen bg-gradient-to-r from-dark-700 to-black">
          <p>Debes estar logueado</p>
        </div>
      )}
    </>
  )
}
