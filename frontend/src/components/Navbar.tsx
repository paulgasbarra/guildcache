import React from "react";
import { RouterLink } from "./RouterLink";
import { useAuth } from "./AuthContext";
import { logo } from "../assets/images";

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <nav className="flex justify-center font-nav">
      <div className="group relative flex items-center">
        <RouterLink endpoint="/enroll">BECOME A STUDENT</RouterLink>
        <RouterLink endpoint="/partners">EMPLOYMENT PARTNERSHIP</RouterLink>
        <RouterLink endpoint="/">
          <img src={logo} />
        </RouterLink>
        <RouterLink endpoint="/classes">CIRRICULUM</RouterLink>
        <RouterLink endpoint="/about">MEET THE TEAM</RouterLink>
        <RouterLink endpoint="/donate">DONATE</RouterLink>
        {isAuthenticated && <RouterLink endpoint="/login">Logout</RouterLink>}
      </div>
    </nav>
  );
};

export default Navbar;
