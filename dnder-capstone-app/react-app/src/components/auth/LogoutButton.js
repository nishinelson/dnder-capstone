import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { clearDM } from "../../store/dm";
import { clearPC } from "../../store/pc";
import './LogoutButton.css'

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = (e) => {
    dispatch(logout());
    dispatch(clearDM());
    dispatch(clearPC());
  };

  return <button className='log' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
