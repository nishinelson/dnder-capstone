import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';
import { addPC } from '../../store/pc'

const PCForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [pcClass, setpcClass] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");


  const onCreatePC = (e) => {
    e.preventDefault();
    const data = {
      pcClass: pcClass,
      experience: experience,
      description: description
    }
    dispatch(addPC(data))
    console.log(data, "CREATEPC WAS RUN")
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

  return (
    <form onSubmit={onCreatePC}>
      <div>
        <label>Character Class</label>
        <select name="pcClass" onChange={updatepcClass} value={pcClass}>
          <option value="">--Select Your Class</option>
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
        <select name="experience" onChange={updateExperience} value={experience}>
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
      <button type="submit">Create PC</button>
    </form>
  )

}

export default PCForm;
