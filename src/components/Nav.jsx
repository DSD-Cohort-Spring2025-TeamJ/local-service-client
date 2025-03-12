import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const active = {
    background: "rgb(76, 227, 76)",
    boxShadow:
      "rgba(2, 139, 57, 0.35) 0 -25px 18px -14px inset, rgba(2, 139, 57, 0.35) 0 1px 2px, rgba(2, 139, 57, 0.35) 0 2px 4px, rgba(2, 139, 57, 0.35) 0 4px 8px, rgba(2, 139, 57, 0.35) 0 8px 16px, rgba(2, 139, 57, 0.35) 0 16px 32px",
    border: "1px solid black",
    transform: "scale(1.1)",
  };

  return (
    <div id="navbar">
      <NavLink to="/" exact className="nav-tab" activeStyle={active}>
        Dashboard
      </NavLink>
      <NavLink to="/login" exact className="nav-tab" activeStyle={active}>
        Login
      </NavLink>
      <NavLink to="/signup" exact className="nav-tab" activeStyle={active}>
        Sign Up
      </NavLink>
    </div>
  );
};

export default Nav;
