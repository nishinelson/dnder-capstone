import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

const ProfilePage = () => {
  const user = useSelector((state) => state?.session?.user)

  return (
    <div>
      {user.firstName}
    </div>
  )
}

export default ProfilePage
