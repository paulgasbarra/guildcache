import React from "react";
import { EntityCreationForm } from "../../components/EntityCreationForm";
import { InstructorFormFields } from "./InstructorFormFields";

export const InstructorCreation: React.FC = () => {
  return (
    <EntityCreationForm
      formTitle="Create - Instructor"
      postEndpoint="/instructors"
      formFields={InstructorFormFields}
      backLink="/admin/instructors"
      successMessage="Instructor created"
    />
  );
};
