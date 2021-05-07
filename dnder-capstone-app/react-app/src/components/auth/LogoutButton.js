import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { clearDM } from "../../store/dm";
import { clearPC } from "../../store/pc";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = (e) => {
    dispatch(logout());
    dispatch(clearDM());
    dispatch(clearPC());
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
