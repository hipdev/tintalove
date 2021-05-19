import useUser from 'hooks/use-user'
import useUserList from 'hooks/use-user-list'
import Masonry from 'react-masonry-css'
import ListPost from './list-post'
import ListNotPublic from './not-public'

const UserList = ({ listData, listItemsData }) => {
  const { state } = useUser()

  console.log(listData, listItemsData, 'esto que')

  const breakpointColumnsObj = {
    default: 6,
    1600: 4,
    1100: 3,
    700: 2,
    500: 1,
  }

  return (
    <div className="h-screen">
      {listData && listData.user_id != state?.user?.uid ? (
        <ListNotPublic />
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {listItemsData.length > 0 ? (
            listItemsData.map((post) => <ListPost key={post.id} post={post} />)
          ) : (
            <p className="text-white bold text-2xl mb-10">
              Sin tattoos guardados
            </p>
          )}
        </Masonry>
      )}
    </div>
  )
}

export default UserList
