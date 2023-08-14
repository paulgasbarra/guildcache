import React from 'react';
import { RouterLink } from './RouterLink';

const Navbar: React.FC = () => (
  <nav className="flex justify-center">
    <ul className="group relative flex items-center">
    <RouterLink endpoint="/">Home</RouterLink>
    <RouterLink endpoint="/students">Students</RouterLink>
    <RouterLink endpoint="/employers">Employers</RouterLink>
    <RouterLink endpoint="/donate">Donate</RouterLink>
    <RouterLink endpoint="/classes">Classes</RouterLink>
    <RouterLink endpoint="/about">About</RouterLink>
    <RouterLink endpoint="/merchandise">Merchandise</RouterLink>
    <RouterLink endpoint="/newsletter">Newsletter</RouterLink>
    <RouterLink endpoint="/contact">Contact</RouterLink>
    <RouterLink endpoint="/admin">Admin</RouterLink>
    </ul>
  </nav>
);

export default Navbar;