import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => (
  <>
    <Link to="/">Home</Link>
    <Link to="/students">Students</Link>
    <Link to="/employers">Employers</Link>
    <Link to="/login">Login</Link>
  </>
);

export default Navbar;