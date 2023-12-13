import React from "react";
import SidebarNav from "../../components/SidebarNav";
import { Outlet } from "react-router-dom";

export const Admin: React.FC = () => {
  return (
    <>
      <div className="flex flex-row">
        <SidebarNav />
        <Outlet />
      </div>
    </>
  );
};
