import useUser from 'hooks/use-user'
import useUserList from 'hooks/use-user-list'
import Masonry from 'react-masonry-css'
import ListPost from './list-post'

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

  if (!listData?.list_name) {
    return (
      <div className="h-screen flex justify-center pt-10">
        <p className="text-gray-300 text-3xl">Ups, esta lista no existe</p>
      </div>
    )
  }
  if (listData?.user_id != state?.user?.uid) {
    return (
      <div className="h-screen flex justify-center pt-10">
        <p className="text-gray-300 text-3xl">Esta lista no es pública</p>
      </div>
    )
  }

  return (
    <div className="h-screen container mx-auto">
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
    </div>
  )
}

export default UserList
