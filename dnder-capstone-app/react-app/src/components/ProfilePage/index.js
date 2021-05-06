import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { getPC } from "../../store/pc"

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);
  const char = useSelector((state) => state?.pc);
  const dunMas = useSelector((state) => state?.dm);

  useEffect(() => {
    dispatch(getPC());
  }, []);

  let pcRender;
  let dmRender;

  if(Object.keys(char).length) {
    pcRender = (
      <div>
        <div>{char.pcClass}</div>
        <div>{char.experience}</div>
        <div>{char.description}</div>
      </div>
    )
  } else {
    pcRender = (
      <div>
        <NavLink to="/PC">Create a PC</NavLink>
      </div>
    )
  }

  if(Object.keys(dunMas).length) {
    dmRender = (
      <div>
        <div>{dunMas.campaign}</div>
        <div>{dunMas.resources}</div>
        <div>{dunMas.experience}</div>
        <div>{dunMas.partySize}</div>
        <div>{dunMas.groupType}</div>
        <div>{dunMas.description}</div>
      </div>
    )
  } else {
    dmRender = (
      <div>
        <NavLink to="/DM">Create a DM</NavLink>
      </div>
    )
  }

  return (
    <div>
      <div>
        {user.firstName}
        {user.city}
        {user.bio}
      </div>
      {pcRender}
      {dmRender}
    </div>
  )
}

export default ProfilePage
