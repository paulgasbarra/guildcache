import React from "react";
import { Link } from "react-router-dom";

export const Admin: React.FC = () => {
  return (
    <>
      <div className="min-h-full flex items-center justify-center mt-16">
        Admin Dashboard
        <Link to="/students">Students</Link>
      </div>
    </>
  );
};
