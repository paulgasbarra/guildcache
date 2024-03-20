import React from "react";
import EntityList from "../../components/EntityList";

export const StudentList: React.FC = () => {
  return (
    <EntityList
      endpoint="/students"
      headers={["name", "email"]}
      entityType="Student"
    />
  );
};
