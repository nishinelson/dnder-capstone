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
  let dmSearch;
  let pcSearch;

  const deletePCcard = () => {
    dispatch(deletePC())
  }

  const deleteDMcard = () => {
    dispatch(deleteDM())
  }

  if(dunMas.groupType === "remote"){
    dmSearch = <NavLink className="card-btns" to="/swipe/pc/remote">Swipe for Players!</NavLink>
  } else {
    dmSearch = <NavLink className="card-btns" to="/swipe/pc/local">Swipe for Players!</NavLink>
  }

  if(char.groupType === "remote"){
    pcSearch = <NavLink className="card-btns" to="/swipe/dm/remote">Swipe for DMs!</NavLink>
  } else {
    pcSearch = <NavLink className="card-btns" to="/swipe/dm/local">Swipe for DMs!</NavLink>
  }

  if(Object.keys(char).length) {
    pcRender = (
      <div className='pc-container'>
        <div>
          {pcSearch}
        </div>
        <div id="pcCard" className={`pc-info ${char.pcClass}`} >
          <div className='title'>Player Character Card</div>
          <div className="card-text">
            <div>Class: {char.pcClass}</div>
            <div>Experience: {char.experience} years</div>
            <div>Group Type: {char.groupType}</div>
            <div className="description">Description: {char.description}</div>
          </div>
        </div>
        <div>
          <NavLink className="card-btns" to="/PC">Edit PC</NavLink>
          <button className="del-btns" onClick={deletePCcard}>Delete PC</button>
        </div>
      </div>
    )
  } else {
    pcRender = (
      <div>
        <NavLink className="card-btns" to="/PC">Create a PC</NavLink>
      </div>
    )
  }

  if(Object.keys(dunMas).length) {
    dmRender = (
      <div className='dm-container'>
        <div>
          {dmSearch}
        </div>
        <div className={`dm-info ${dunMas.experience}`}>
          <div className='title'>Dungeon Master Card</div>
          <div className="card-text">
            <div>Campaign: {dunMas.campaign}</div>
            <div>Resources: {dunMas.resources}</div>
            <div>Experience: {dunMas.experience}</div>
            <div>Party Size: {dunMas.partySize} people</div>
            <div>Group Type: {dunMas.groupType}</div>
            <div className="description">Description: {dunMas.description}</div>
          </div>
        </div>
        <div>
          <NavLink className="card-btns" to="/DM">Edit DM</NavLink>
          <button className="del-btns" onClick={deleteDMcard}>Delete DM</button>
        </div>
      </div>

    )
  } else {
    dmRender = (
      <div>
        <NavLink className="card-btns" to="/DM">Create a DM</NavLink>
      </div>
    )
  }

  return (
    <div className='profile-page'>
      <div className='bio'>
        <div className="username">{user.firstName}'s Profile Page</div>
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
