import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/session";
import './Splash.css';

const Splash = () => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  if (user){
    return <Redirect to="/profiles/me" />
  }

  return (
    <div className='splashContainer'>
      <div className='splashWelcome'>Welcom to dnder!</div>
      <div className='splashInfo'>Create a player and/or dungeon master card and swipe through other
        user's cards in order to match with people you'd like to play Dungeons and Dragons with.
      </div>
      <div className='splashMessage'>Log-in or Sign-up to start swiping for your dnd party!</div>
      <div className='sign-demo'>
        <NavLink className='signUp' to="/sign-up">
          Create Account
        </NavLink>
        <button className='demo-btn' type='submit' onClick={() => dispatch(login("demo@aa.io", "password1"))}>Demo</button>
      </div>
    </div>
  )
}

export default Splash;
