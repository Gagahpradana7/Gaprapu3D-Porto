import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="header">
      <NavLink
        to={"/"}
        className="w-10 h-10 rounded-lg bg-white flex items-center justify-center font-bold shadow-md backdrop-brightness-110 backdrop-blur-md"
      >
        <p className="blue-gradient_text ">GNH</p>
      </NavLink>
      <nav className="flex text-lg  gap-7 font-medium">
        <NavLink
          to={"/about"}
          className={({ isActive }) =>
            isActive ? "text-blue-500" : "text-gray-400"
          }
        >
          About
        </NavLink>
        <NavLink
          to={"/projects"}
          className={({ isActive }) =>
            isActive ? "text-purple-500" : "text-gray-400"
          }
        >
          Projects
        </NavLink>
        <NavLink
          to={"/contact"}
          className={({ isActive }) =>
            isActive ? "text-green-600" : "text-gray-400"
          }
        >
          Contact
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
