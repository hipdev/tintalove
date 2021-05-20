import useUser from 'hooks/use-user'
import useUserList from 'hooks/use-user-list'
import { useEffect, useState } from 'react'
import Masonry from 'react-masonry-css'
import ListPost from './list-post'
import ListNotPublic from './not-public'

const UserList = ({ listId }) => {
  const { state } = useUser()

  const { userList }: any = useUserList(listId)

  console.log(userList, 'items')

  if (!userList) {
    return (
      <div className="h-screen flex justify-center pt-10">
        <p className="text-gray-300 text-3xl">Ups, esta lista no existe</p>
      </div>
    )
  }

  if (!userList?.userListItems) {
    return <div className="">Sin post guardados</div>
  }

  const breakpointColumnsObj = {
    default: 6,
    1600: 4,
    1100: 3,
    700: 2,
    500: 1,
  }

  if (!state && !state.user.uid) {
    return <span>Cargando user...</span>
  }
  return (
    <div className="h-full lg:h-screen px-10 md:px-20 pt-12">
      <h2 className="mb-4 text-2xl font-semibold text-gray-300">
        {userList.userList.list_name}{' '}
        <span className="ml-3 font-medium"> (4) </span>
      </h2>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {userList.userListItems.length > 0 ? (
          userList.userListItems.map((post) => (
            <ListPost key={post.id} post={post} />
          ))
        ) : (
          <p className="text-white bold text-2xl mb-10">
            Sin tattoos guardados
          </p>
        )}
      </Masonry>
    </div>
  )
}

export default UserList
