import React from "react"
import { NavLink, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"
import './Splash.css'

const Splash = () => {
  const user = useSelector(state => state.session.user)

  if (user){
    return <Redirect to="/profiles/me" />
  }

  return (
    <div className='splashContainer'>
      <div className='splashWelcome'>Welcom to dnder!</div>
      <div className='splashMessage'>Log-in or Sign-up to start swiping for your dnd party!</div>
      <NavLink className='signUp' to="/sign-up">
        Create Account
      </NavLink>
    </div>
  )
}

export default Splash;
