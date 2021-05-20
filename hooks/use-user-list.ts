import { getUserListItems } from 'lib/queries/lists'
import usePromise from 'react-use-promise'

const useUserList = (listId) => {
  console.log('entramos arriba', listId)

  const fetch = async () => {
    if (listId) {
      console.log('entramos')
      const { userListItems, userList }: any = await getUserListItems(listId)
      return { userListItems, userList }
    }
  }
  const [result, error, state] = usePromise(fetch, [])

  return { result, state }
}

export default useUserList
