import React from "react";
import EntityList from "../../components/EntityList";

export const DonorList: React.FC = () => {
  return (
    <EntityList
      endpoint="/donors"
      headers={["name", "email"]}
      entityType="Donor"
    />
  );
};
