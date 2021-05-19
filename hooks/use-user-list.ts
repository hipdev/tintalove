import { getUserListItems } from 'lib/queries/lists'
import usePromise from 'react-use-promise'

const useUserList = (listId) => {
  const fetch = async () => {
    if (listId) {
      const { userListItems, userList }: any = await getUserListItems(listId)
      return { userListItems, userList }
    }
  }
  const [result, error, state] = usePromise(fetch, [])

  return { result, state }
}

export default useUserList
