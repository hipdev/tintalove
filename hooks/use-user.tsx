import { useStateMachine } from 'little-state-machine'
import { getUser } from 'lib/actions'

const useUser = function () {
  const { state }: any = useStateMachine({
    getUser,
  })

  return { state }
}

export default useUser
