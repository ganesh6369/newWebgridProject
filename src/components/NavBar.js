import React from "react";
import { NavLink } from "react-router-dom";
const navActive = ({ isActive }) => {
  return { fontWeight: isActive ? "bold" : "" };
};

export const NavBar = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink to={"/"} style={navActive}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to={"/table"} style={navActive}>
            Table
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
