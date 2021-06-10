import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { login } from "../../store/session";
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  const user = useSelector((state) => state?.session?.user)
  const dispatch = useDispatch();

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
          <div className="sign-in-div">
            <button className='demo-btn nav-btn' type='submit' onClick={() => dispatch(login("demo@aa.io", "password1"))}>Demo</button>
            <NavLink className='signUp nav-btn' to="/sign-up">
              Sign Up
            </NavLink>
            <NavLink className='nav-link nav-btn' to="/login" exact={true}>
              Log In
            </NavLink>
          </div>
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
