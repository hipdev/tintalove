import { getUserListItems } from 'lib/queries/lists'
import { useEffect, useState } from 'react'

const useUserList = (listId) => {
  const [userList, setUserList] = useState({})
  const [userListItems, setUserListItems] = useState([])

  useEffect(() => {
    console.log(listId, 'el id de la lista')
    const fetch = async () => {
      if (listId) {
        const { userListItems, userList } = await getUserListItems(listId)
        setUserList(userList)
        setUserListItems(userListItems)
      }
    }
    fetch()
  }, [listId])

  return { userList, userListItems, setUserListItems }
}

export default useUserList
