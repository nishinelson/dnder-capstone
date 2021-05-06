import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { addDM } from '../../store/dm'

const DMForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [campaign, setCampaign] = useState("");
  const [resources, setResources] = useState("");
  const [partySize, setPartySize] = useState(0);
  const [groupType, setGroupType] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");

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
        <input
        type="number"
        name="partySize"
        onChange={updatePartySize}
        value={partySize}
        ></input>
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
      <button type="submit">Create DM</button>
    </form>
  )
}

export default DMForm;
