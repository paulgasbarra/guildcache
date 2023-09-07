import React from "react";
import { RouterLink } from "./RouterLink";

const Navbar: React.FC = () => (
  <nav className="flex justify-center">
    <ul className="group relative flex items-center">
      <RouterLink endpoint="/">Home</RouterLink>
      <RouterLink endpoint="/enroll">Become a Student</RouterLink>
      <RouterLink endpoint="/partners">Employment Partnership</RouterLink>
      <RouterLink endpoint="/classes">Cirriculum</RouterLink>
      <RouterLink endpoint="/about">Meet The Team</RouterLink>
      <RouterLink endpoint="/donate">Donate</RouterLink>
    </ul>
  </nav>
);

export default Navbar;
