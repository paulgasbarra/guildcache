import React from "react";
import EntityList from "../../components/EntityList";
import { ENDPOINTS } from "../../api";

export const EmployerList: React.FC = () => {
  return (
    <EntityList
      endpoint={ENDPOINTS.EMPLOYERS.LIST}
      headers={["name", "email"]}
      entityType="Employer"
    />
  );
};
