import { getUserListItems } from 'lib/queries/lists'
import { useEffect, useState } from 'react'

const useUserList = (listId) => {
  const [userList, setUserList] = useState({})

  useEffect(() => {
    console.log(listId, 'el id de la lista')
    const fetch = async () => {
      if (listId) {
        const { userListItems, userList }: any = await getUserListItems(listId)
        setUserList({ userListItems, userList })
      }
    }
    fetch()
  }, [listId])

  return { userList }
}

export default useUserList
