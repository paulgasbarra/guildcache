import React from "react";
import EntityList from "../../components/EntityList";

export const CohortList: React.FC = () => {
  return (
    <EntityList
      endpoint="/cohorts"
      headers={["name", "location"]}
      entityType="Cohort"
    />
  );
};
