import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { addDM, editDM } from '../../store/dm'

const DMForm = () => {
  const dispatch = useDispatch();
  const dunMas = useSelector((state) => state?.dm)
  const history = useHistory();
  const [campaign, setCampaign] = useState(dunMas.campaign || "");
  const [resources, setResources] = useState(dunMas.resources || "");
  const [partySize, setPartySize] = useState(dunMas.partySize || "");
  const [groupType, setGroupType] = useState(dunMas.groupType || "");
  const [experience, setExperience] = useState(dunMas.experience || "");
  const [description, setDescription] = useState(dunMas.description || "");

  let btn = <button className='sign-btn' type=" submit">Create DM</button>

  if(Object.keys(dunMas).length) {
    btn = <button className='sign-btn' type=" submit">Edit DM</button>
  }

  const onCreateDM = (e) => {
    e.preventDefault();
    const data = {
      campaign: campaign,
      resources: resources,
      partySize: partySize,
      groupType: groupType,
      experience: experience,
      description: description
    }

    if(Object.keys(dunMas).length){
      dispatch(editDM(data))
      history.push("/profiles/me");
      return
    }

    dispatch(addDM(data))
    console.log(data, "CREATEPC WAS RUN")
    history.push("/profiles/me");
  };

  const updateCampaign = (e) => {
    setCampaign(e.target.value);
  };

  const updateResources = (e) => {
    setResources(e.target.value);
  };

  const updatePartySize = (e) => {
    setPartySize(e.target.value);
  };

  const updateGroupType = (e) => {
    setGroupType(e.target.value);
  };

  const updateExperience = (e) => {
    setExperience(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className='form-container'>
      <form onSubmit={onCreateDM}>
        <div>
          <label>Which campaign will you run?</label>
          <input
          type="text"
          name="campaign"
          onChange={updateCampaign}
          value={campaign}
          ></input>
        </div>
        <div>
          <label>Resources Used</label>
          <input
          type="text"
          name="resources"
          onChange={updateResources}
          value={resources}
          ></input>
        </div>
        <div>
          <lable>Party Size</lable>
          <select name="partySize" onChange={updatePartySize} value={partySize}>
            <option value="">--party size--</option>
            <option value="1-3">1-3</option>
            <option value="4-6">4-6</option>
            <option value="7+">7+</option>
          </select>
        </div>
        <div>
          <label>Group Type</label>
          <select name="groupType" onChange={updateGroupType} value={groupType}>
            <option value="">--group type--</option>
            <option value="in-person">in-person</option>
            <option value="remote">remote</option>
          </select>
        </div>
        <div>
          <label>Years of Experience</label>
          <select name="experience" onChange={updateExperience} value={experience}>
            <option value="">--experience range--</option>
            <option value="novice">Novice</option>
            <option value="adept">Adept</option>
            <option value="master">Master</option>
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
        {btn}
      </form>
    </div>
  )
}

export default DMForm;
