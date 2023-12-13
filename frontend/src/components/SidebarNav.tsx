import React from "react";
import { Link } from "react-router-dom";

const SidebarNav = () => {
  return (
    <nav className="bg-gray-800 text-white h-screen w-50 p-4 float-left">
      <ul>
        <li>
          <Link to="students" className="block py-2 px-4 hover:bg-gray-600">
            Students
          </Link>
          <ul>
            <li>
              <Link
                className="block py-2 px-8 hover:bg-gray-600"
                to="create-student"
              >
                Create Student
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="teachers" className="block py-2 px-4 hover:bg-gray-600">
            Teachers
          </Link>
        </li>
        <li>
          <Link to="donors" className="block py-2 px-4 hover:bg-gray-600">
            Donors
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
