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
        <NavLink className='nav-link' to="/profiles/me" exact={true}>
            Home
          </NavLink>
          <LogoutButton />
      </nav>
    )
  } else {
    render = (
      <nav>
        <NavLink className='nav-link' to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
          <NavLink className='nav-link' to="/login" exact={true}>
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
