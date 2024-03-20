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
            <li>
              <Link
                className="block py-2 px-8 hover:bg-gray-600"
                to="upload-student-csv"
              >
                Upload Students CSV
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="instructors" className="block py-2 px-4 hover:bg-gray-600">
            Instructors
          </Link>
          <ul>
            <li>
              <Link
                className="block py-2 px-8 hover:bg-gray-600"
                to="create-instructor"
              >
                Create Instructor
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="donors" className="block py-2 px-4 hover:bg-gray-600">
            Donors
          </Link>
          <ul>
            <li>
              <Link
                className="block py-2 px-8 hover:bg-gray-600"
                to="create-donor"
              >
                Create Donor
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="employers" className="block py-2 px-4 hover:bg-gray-600">
            Employers
          </Link>
          <ul>
            <li>
              <Link
                className="block py-2 px-8 hover:bg-gray-600"
                to="create-employer"
              >
                Create Employer
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
