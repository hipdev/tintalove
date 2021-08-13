const UserProfile = ({ user }) => {
  return (
    <div className="flex text-gray-400 container mx-auto mt-20">
      <div className="mr-20">
        <img />
        <span>{user.displayName}</span>
      </div>

      <div className="flex flex-col">
        <div>
          <h3>Colecciones</h3>
          <div>item</div>
          <div>item</div>
          <div>item</div>
        </div>
        <div>
          <h3>Tatuadores</h3>
          <div>item</div>
          <div>item</div>
          <div>item</div>
        </div>
        <div>
          <h3>Estudios </h3>
          <div>item</div>
          <div>item</div>
          <div>item</div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
