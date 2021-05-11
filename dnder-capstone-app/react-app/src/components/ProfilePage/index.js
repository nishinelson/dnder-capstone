import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { getPC, deletePC } from "../../store/pc"
import { getDM, deleteDM } from "../../store/dm"

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);

  useEffect(() => {
    dispatch(getPC());
    dispatch(getDM());
  }, []);

  const char = useSelector((state) => state?.pc);
  const dunMas = useSelector((state) => state?.dm);

  let pcRender;
  let dmRender;

  const deletePCcard = () => {
    dispatch(deletePC())
  }

  const deleteDMcard = () => {
    dispatch(deleteDM())
  }

  if(Object.keys(char).length) {
    pcRender = (
      <div>
        <NavLink to="/swipe/dm/local">Search for local DMs!</NavLink>
        <NavLink to="/swipe/dm/remote">Search for remote DMs!</NavLink>
        <div>{char.pcClass}</div>
        <div>{char.experience}</div>
        <div>{char.description}</div>
        <div>
          <NavLink to="/PC">Edit PC</NavLink>
        </div>
        <button onClick={deletePCcard}>Delete PC</button>
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
        <NavLink to="/swipe/pc/local">Search for local players!</NavLink>
        <NavLink to="/swipe/pc/remote">Search for remote players!</NavLink>
        <div>{dunMas.campaign}</div>
        <div>{dunMas.resources}</div>
        <div>{dunMas.experience}</div>
        <div>{dunMas.partySize}</div>
        <div>{dunMas.groupType}</div>
        <div>{dunMas.description}</div>
        <div>
          <NavLink to="/DM">Edit DM</NavLink>
        </div>
        <button onClick={deleteDMcard}>Delete PC</button>
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
      <NavLink to="/swipe">Swipe!</NavLink>
      {pcRender}
      {dmRender}
    </div>
  )
}

export default ProfilePage
