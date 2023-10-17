import React from "react";
import { NavLink } from "./NavLink";
import { useAuth } from "./AuthContext";
import { logo } from "../assets/images";

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <nav className="flex justify-center font-nav px-10">
      <div className="group relative w-full flex justify-between">
        <NavLink endpoint="/enroll">BECOME A STUDENT</NavLink>
        <NavLink endpoint="/partners">EMPLOYMENT PARTNERSHIP</NavLink>
        <NavLink endpoint="/">
          <img src={logo} />
        </NavLink>
        <NavLink endpoint="/classes">CIRRICULUM</NavLink>
        <NavLink endpoint="/about">MEET THE TEAM</NavLink>
        <NavLink endpoint="/donate">DONATE</NavLink>
        {isAuthenticated && <NavLink endpoint="/login">Logout</NavLink>}
      </div>
    </nav>
  );
};

export default Navbar;
