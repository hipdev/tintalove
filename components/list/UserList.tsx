import Loading from 'components/loading/loading'
import { getUserListItems } from 'lib/queries/lists'
import Masonry from 'react-masonry-css'
import useSWR from 'swr'
import ListPost from './ListPost'
import ListNotPublic from './NotPublic'

const UserList = ({ listId, user }) => {
  // const { userList, userListItems, setUserListItems }: any = useUserList(listId)
  const { data, mutate }: any = useSWR(
    user?.id ? ['getUserListItems', listId, user.id] : null,
    getUserListItems
  )

  if (!data?.listItems && !data?.userList) {
    return <Loading />
  }

  const breakpointColumnsObj = {
    default: 6,
    1600: 4,
    1100: 3,
    700: 2,
    500: 1,
  }

  if (data?.userList && data?.userList.user_id != user?.id) {
    return <ListNotPublic />
  }

  return (
    <div className="h-full lg:h-screen px-10 md:px-20 pt-12">
      <h2 className="mb-4 text-2xl font-semibold text-gray-300">
        {data?.userList?.name}
        <span className="ml-3 font-medium">
          ({data?.userList?.total_items || 0}){' '}
        </span>
      </h2>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {data.listItems?.length > 0 ? (
          data.listItems.map((list) => (
            <ListPost
              key={list.id}
              list={list}
              user={user}
              mutateList={mutate}
            />
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
