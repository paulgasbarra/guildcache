import React from "react";
import { NavLink } from "./NavLink";
import { useAuth } from "./AuthContext";

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <nav className="flex justify-center font-nav px-32">
      <div className="group relative w-full flex justify-between">
        <NavLink endpoint="/login">
          {isAuthenticated ? "Log out" : "Log in"}
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
