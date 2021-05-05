import React from "react"
import { NavLink } from "react-router-dom"

const Splash = () => {

  return (
    <div>
      <div>Welcom to dnder!</div>
      <div>Log-in or Sign-up to start swiping for your dnd party!</div>
      <NavLink to="/sign-up">
        Create Account
      </NavLink>
    </div>
  )
}

export default Splash;
