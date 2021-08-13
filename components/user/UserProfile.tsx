const UserProfile = ({ user }) => {
  return (
    <div className="flex">
      <div>
        <img />
        <span>{user.displayName}</span>
      </div>

      <div className="flex">
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
