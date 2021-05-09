import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux"
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  const user = useSelector((state) => state?.session?.user)

  let render;

  if(user){
    render = (
      <nav>
        <NavLink to="/profiles/me" exact={true} activeClassName="active">
            Home
          </NavLink>
          <LogoutButton />
      </nav>
    )
  } else {
    render = (
      <nav>
        <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
      </nav>
    )
  }
  return (
    <div>
      {render}
    </div>
  );
}

export default NavBar;
