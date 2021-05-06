import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"

const ProfilePage = () => {
  const user = useSelector((state) => state?.session?.user)

  return (
    <div>
      <div>
        {user.firstName}
      </div>
      <NavLink to="/PC">Create a PC</NavLink>
    </div>
  )
}

export default ProfilePage
