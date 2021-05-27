import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, city, state, bio, password));

      if (data.errors) {
        setErrors(data.errors);
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateCity = (e) => {
    setCity(e.target.value);
  };

  const updateState = (e) => {
    setState(e.target.value);
  };

  const updateBio = (e) => {
    setBio(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/profiles/me" />;
  }

  return (
    <div className='form-container'>
      <form onSubmit={onSignUp}>
      <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div>
          <div>
            <label>First Name</label>
          </div>
          <input
            type="text"
            name="firstName"
            onChange={updateFirstName}
            value={firstName}
          ></input>
        </div>
        <div>
          <div>
            <label>Last Name</label>
          </div>
          <input
            type="text"
            name="lastName"
            onChange={updateLastName}
            value={lastName}
          ></input>
        </div>
        <div>
          <div>
            <label>Email</label>
          </div>
          <input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <div>
            <label>City</label>
          </div>
          <input
            type="text"
            name="city"
            onChange={updateCity}
            value={city}
          ></input>
        </div>
        <div>
          <div>
            <label>State</label>
          </div>
          <input
            type="text"
            name="state"
            onChange={updateState}
            value={state}
          ></input>
        </div>
        <div>
          <div>
            <label>Bio</label>
          </div>
          <textarea
            type="text"
            name="bio"
            onChange={updateBio}
            value={bio}
          ></textarea>
        </div>
        <div>
          <div>
            <label>Password</label>
          </div>
          <input
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
            required={true}
          ></input>
        </div>
        <div>
          <div>
            <label>Repeat Password</label>
          </div>
          <input
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button className='sign-btn' type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
