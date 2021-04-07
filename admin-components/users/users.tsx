import useUsers from 'hooks/admin/use-users'

const AdminUsers = () => {
  const { users } = useUsers()

  console.log(users, 'los users')

  return (
    <div>
      {/* {users &&
        users.map((user) => {
          return (
            <div>
              <div>{user.displayName}</div>
              <div>{user.email}</div>
              <div>{user.username}</div>
            </div>
          )
        })} */}
    </div>
  )
}

export default AdminUsers
