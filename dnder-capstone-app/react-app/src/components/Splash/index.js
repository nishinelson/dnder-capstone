import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import './Splash.css';

const Splash = () => {
  const user = useSelector(state => state.session.user)

  if (user){
    return <Redirect to="/profiles/me" />
  }

  return (
    <div className='splashContainer'>
      <div className='splashWelcome'>Welcome to dnder!</div>
      <div className='splashInfo'>Create a player and/or dungeon master card and swipe through other
        user's cards in order to match with people you'd like to play Dungeons and Dragons with.
      </div>
      <div className='splashMessage'>Log-in or Sign-up to start swiping for your dnd party!</div>
      <div className='intro'>Here's how to navigate this site:</div>
      <div className='first-instr'>After Logging in or Signing up, press the button at the center of either card to create your own PC </div>
      <img className='instruct-img-1' src='https://i.imgur.com/Ad74PxS.png' alt='first walkthrough img'/>

    </div>
  )
}

export default Splash;
