import React from "react";
import { NavLink } from "./NavLink";
import { useAuth } from "./AuthContext";
import logo from "../assets/images/guildcache-logo.png";

const Navbar: React.FC = () => {
  const { isAuthenticated, organization } = useAuth();
  return (
    <nav className="bg-white shadow-lg">
      <div className="w-full mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <a href="#" className="flex items-center py-4 px-2">
                <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
                <span className="font-semibold text-gray-500 text-lg">
                  GuildCache
                </span>
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <h1>{organization}</h1>
            <NavLink endpoint="/login">
              {isAuthenticated ? "Sign Out" : "Sign In"}
            </NavLink>
            {!isAuthenticated ? (
              <NavLink endpoint="/signup">Sign Up</NavLink>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
