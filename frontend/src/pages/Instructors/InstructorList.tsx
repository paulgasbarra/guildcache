import React from "react";
import EntityList from "../../components/EntityList";

export const InstructorList: React.FC = () => {
  return (
    <EntityList
      endpoint="/instructors"
      headers={["name", "email"]}
      entityType="Instructor"
    />
  );
};
