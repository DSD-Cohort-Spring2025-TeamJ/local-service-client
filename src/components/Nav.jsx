import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {

  const active = {
    background: "rgb(76, 227, 76)",
    boxShadow: "rgba(2, 139, 57, 0.35) 0 -25px 18px -14px inset, rgba(2, 139, 57, 0.35) 0 1px 2px, rgba(2, 139, 57, 0.35) 0 2px 4px, rgba(2, 139, 57, 0.35) 0 4px 8px, rgba(2, 139, 57, 0.35) 0 8px 16px, rgba(2, 139, 57, 0.35) 0 16px 32px",
    border: "1px solid #005701",
    transform: "scale(1.1)"
  }

  return (
    <div id="navbar">
      <NavLink
        to="/"
        exact
        className="bg-[#4BCE4B] rounded-[1rem] no-underline px-[5px] py-[5px] w-[100px]
                shadow-[inset_0_-25px_18px_-14px_rgba(1,185,38,0.35),0_1px_2px_rgba(1,177,30,0.35),0_2px_4px_rgba(3,194,79,0.35),0_4px_8px_rgba(1,192,17,0.35),0_8px_16px_rgba(1,119,42,0.35),0_16px_32px_rgba(2,199,78,0.35)]
                text-[#4B4B4B] font-sans border-[1px] border-[#4BCE4B]
                hover:bg-green-700 hover:text-white
                active:scale-90 border-[#005701]"
        // activeStyle={active}
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/login"
        exact
        className="bg-[#4BCE4B] rounded-[1rem] no-underline px-[5px] py-[5px] w-[100px]
                shadow-[inset_0_-25px_18px_-14px_rgba(1,185,38,0.35),0_1px_2px_rgba(1,177,30,0.35),0_2px_4px_rgba(3,194,79,0.35),0_4px_8px_rgba(1,192,17,0.35),0_8px_16px_rgba(1,119,42,0.35),0_16px_32px_rgba(2,199,78,0.35)]
                text-[#4B4B4B] font-sans border-[1px] border-[#4BCE4B]
                hover:bg-green-700 hover:text-white
                active:scale-90 border-[#005701]"
        // activeStyle={active}
      >
        Login
      </NavLink>
      <NavLink
        to="/signup"
        exact
        className="bg-[#4BCE4B] rounded-[1rem] no-underline px-[5px] py-[5px] w-[100px]
                shadow-[inset_0_-25px_18px_-14px_rgba(1,185,38,0.35),0_1px_2px_rgba(1,177,30,0.35),0_2px_4px_rgba(3,194,79,0.35),0_4px_8px_rgba(1,192,17,0.35),0_8px_16px_rgba(1,119,42,0.35),0_16px_32px_rgba(2,199,78,0.35)]
                text-[#4B4B4B] font-sans border-[1px] border-[#4BCE4B]
                hover:bg-green-700 hover:text-white
                active:scale-90 border-[#005701]"
        // activeStyle={active}
      >
        Sign Up
      </NavLink>
    </div>
  );
}

export default Nav;