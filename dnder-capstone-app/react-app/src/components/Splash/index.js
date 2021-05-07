import React from "react"
import { NavLink, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"

const Splash = () => {
  const user = useSelector(state => state.session.user)

  if (user){
    return <Redirect to="/profiles/me" />
  }

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
