import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { getPC, deletePC } from "../../store/pc"
import { getDM, deleteDM } from "../../store/dm"
import { clearMatch, getDMmatches, getPCmatches } from "../../store/match"
import './ProfilePage.css'

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);

  useEffect(() => {
    dispatch(clearMatch())
    dispatch(getPC());
    dispatch(getDM());
    dispatch(getDMmatches());
    dispatch(getPCmatches());
  }, []);

  const char = useSelector((state) => state?.pc);
  const dunMas = useSelector((state) => state?.dm);
  const dmMatches = useSelector((state) => state?.match?.DMmatches);
  const pcMatches = useSelector((state) => state?.match?.PCmatches);

  let pcRender;
  let dmRender;
  let dmSearch;
  let pcSearch;

  const deletePCcard = async () => {
    await dispatch(deletePC());
    await dispatch(getPCmatches());
  }

  const deleteDMcard = async () => {
    await dispatch(deleteDM());
    await dispatch(getDMmatches());
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
            <div><b>Class:</b> {char.pcClass}</div>
            <div><b>Experience:</b> {char.experience} years</div>
            <div><b>Group Type:</b> {char.groupType}</div>
            <div className="description"><b>Description:</b> {char.description}</div>
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
            <div><b>Campaign:</b> {dunMas.campaign}</div>
            <div><b>Resources:</b> {dunMas.resources}</div>
            <div><b>Experience:</b> {dunMas.experience}</div>
            <div><b>Party Size:</b> {dunMas.partySize} people</div>
            <div><b>Group Type:</b> {dunMas.groupType}</div>
            <div className="description"><b>Description:</b> {dunMas.description}</div>
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
          <div className="location-div"><b>Location:</b> {user.city}, {user.state}</div>
          <div className="contact-div"><b>Contact Info:</b> {user.email}</div>
          <div className="bio-div"><b>Bio:</b> {user.bio}</div>
        </div>
        <NavLink className="card-btns" to="/sign-up">Edit</NavLink>
        <div className="match-container">
          <div className="pc-matches">
            <label className="party-label">PC Parties</label>
            <div className="pc-list">
              {pcMatches?.map((dm) =>
               <NavLink to={`/chat/${dm.id}`} className="party-item dm-item" key={dm.id}>
                <div className="party-info campaign"><label className="item-label">Campaign:</label>{dm.campaign}</div>
                <div className="party-info"><label className="item-label">DM:</label>{dm.user.firstName}</div>
                <div className="party-info p-size"><label className="item-label">Party Size:</label>{dm.partySize}</div>
               </NavLink>)}
            </div>
          </div>
          <div className="dm-matches">
            <label className="party-label">DM Party</label>
            {dmMatches?.length ? (
            <NavLink className="dm-list" to={`/chat/${dunMas.id}`}>
              {dmMatches?.map((pc) =>
                <div className="party-item" key={pc.id}>
                  <div className="party-info"><label className="item-label">PC Name:</label>{pc.user.firstName}</div>
                  <div className="party-info"><label className="item-label">Class:</label>{pc.pcClass}</div>
                  <div className="party-info p-size"><label className="item-label">Experience:</label>{pc.experience}</div>
                </div>)}
            </NavLink>
            ) : (
              <div className="dm-list">
                {dmMatches?.map((pc) =>
                <div className="party-item" key={pc.id}>
                  <div className="party-info"><label className="item-label">PC Name:</label>{pc.user.firstName}</div>
                  <div className="party-info"><label className="item-label">Class:</label>{pc.pcClass}</div>
                  <div className="party-info p-size"><label className="item-label">Experience:</label>{pc.experience}</div>
                </div>)}
              </div>
            )}
          </div>
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
