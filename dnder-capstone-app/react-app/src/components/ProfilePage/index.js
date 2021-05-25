import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { getPC, deletePC } from "../../store/pc"
import { getDM, deleteDM } from "../../store/dm"
import { getDMmatches, getPCmatches } from "../../store/match"
import './ProfilePage.css'

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);

  useEffect(() => {
    dispatch(getPC());
    dispatch(getDM());
  }, []);

  const char = useSelector((state) => state?.pc);
  const dunMas = useSelector((state) => state?.dm);

  useEffect(() =>{
    if(Object.values(dunMas).length){
      dispatch(getDMmatches());
    }

    if(Object.values(char).length){
      dispatch(getPCmatches());
    }
  })

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
      <div className='pc-container'>
        <div>Swipe for DMs!</div>
        <div>
          <NavLink to="/swipe/dm/local">In-person</NavLink>
          <NavLink to="/swipe/dm/remote">Remote</NavLink>
        </div>
        <div className={`pc-info ${char.pcClass}`} >
          <div className='title'>Player Character Card</div>
          <div>
            <div>Class: {char.pcClass}</div>
            <div>Experience: {char.experience} years</div>
            <div>Group Type: {char.groupType}</div>
            <div>Description: {char.description}</div>
          </div>
        </div>
        <div>
          <NavLink to="/PC">Edit PC</NavLink>
          <button onClick={deletePCcard}>Delete PC</button>
        </div>
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
      <div className='dm-container'>
        <div>Swipe for Players!</div>
        <div>
          <NavLink to="/swipe/pc/local">In-person</NavLink>
          <NavLink to="/swipe/pc/remote">Remote</NavLink>
        </div>
        <div className={`dm-info ${dunMas.experience}`}>
          <div className='title'>Dungeon Master Card</div>
          <div>
            <div>Campaign: {dunMas.campaign}</div>
            <div>Resources: {dunMas.resources}</div>
            <div>Experience: {dunMas.experience}</div>
            <div>Party Size: {dunMas.partySize} people</div>
            <div>Group Type: {dunMas.groupType}</div>
            <div>Description: {dunMas.description}</div>
          </div>
        </div>
        <div>
          <NavLink to="/DM">Edit DM</NavLink>
          <button onClick={deleteDMcard}>Delete DM</button>
        </div>
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
    <div className='profile-page'>
      <div className='bio'>
        <div>{user.firstName}'s Profile Page</div>
        <div className='user-info'>
          <div className='user-contact'>
            <div>Location: {user.city}, {user.state}</div>
            <div>Contact Info: {user.email}</div>
          </div>
          <div>Bio: {user.bio}</div>
        </div>
      </div>
      <div className='card-div'>
        {pcRender}
        {dmRender}
      </div>

    </div>
  )
}

export default ProfilePage
