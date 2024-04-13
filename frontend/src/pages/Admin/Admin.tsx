import React from "react";
import SidebarNav from "../../components/SidebarNav";
import SectionContainer from "../../components/SectionContainer";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const Admin: React.FC = () => {
  const location = useLocation().pathname.split("/")[2];

  return (
    <>
      <div className="flex flex-row">
        <SidebarNav />
        <SectionContainer headerText={location}>
          <Outlet />
        </SectionContainer>
      </div>
    </>
  );
};
