import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { addPC, editPC } from '../../store/pc'

const PCForm = () => {
  const dispatch = useDispatch();
  const char = useSelector((state) => state?.pc)
  const history = useHistory();
  const [pcClass, setpcClass] = useState(char.pcClass || "");
  const [experience, setExperience] = useState(char.experience || "");
  const [description, setDescription] = useState(char.description || "");
  const [groupType, setGroupType] = useState(char.groupType || "");


  let btn = <button className='sign-btn' type="submit">Create PC</button>

  if(Object.keys(char).length){
    btn = <button className='sign-btn' type="submit">Edit PC</button>
  }


  const onCreatePC = (e) => {
    e.preventDefault();
    const data = {
      pcClass: pcClass,
      experience: experience,
      description: description,
      groupType: groupType
    }

    if(Object.keys(char).length){
      dispatch(editPC(data))
      history.push("/profiles/me");
      return
    }

    dispatch(addPC(data))
    history.push("/profiles/me");
  }

  const updatepcClass = (e) => {
    setpcClass(e.target.value);
  }

  const updateExperience = (e) => {
    setExperience(e.target.value);
  }

  const updateDescription = (e) => {
    setDescription(e.target.value);
  }

  const updateGroupType = (e) => {
    setGroupType(e.target.value);
  }

  return (
    <div className='form-container'>
      <form onSubmit={onCreatePC}>
        <div>
          <label>Character Class</label>
          <select name="pcClass" onChange={updatepcClass} value={pcClass} required={true}>
            <option value="">--Select Your Class--</option>
            <option value="barbarian">Barbarian</option>
            <option value="bard">Bard</option>
            <option value="cleric">Cleric</option>
            <option value="druid">Druid</option>
            <option value="fighter">Fighter</option>
            <option value="monk">Monk</option>
            <option value="paladin">Paladin</option>
            <option value="ranger">Ranger</option>
            <option value="rogue">Rogue</option>
            <option value="sorcerer">Sorcerer</option>
            <option value="warlock">Warlock</option>
            <option value="wizard">Wizard</option>
          </select>
        </div>
        <div>
          <label>Years of Experience</label>
          <select name="experience" onChange={updateExperience} value={experience} required={true}>
            <option value="">--experience range--</option>
            <option value="0-1">0-1</option>
            <option value="1-5">1-5</option>
            <option value="5+">5+</option>
          </select>
        </div>
        <div>
          <label>Character Description</label>
          <textarea
          type="text"
          name="description"
          onChange={updateDescription}
          value={description}
          ></textarea>
        </div>
        <div className="group-type">
          <label>Group Type</label>
          <select className="group-sel" name="groupType" onChange={updateGroupType} value={groupType} required={true}>
            <option value="">--in-person or remote?--</option>
            <option value="in-person">in-person</option>
            <option value="remote">remote</option>
          </select>
        </div>
        {btn}
      </form>
    </div>
  )

}

export default PCForm;
