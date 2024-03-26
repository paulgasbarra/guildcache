import React from "react";
import { EntityCreationForm } from "../../components/EntityCreationForm";
import { InstructorFormFields } from "./InstructorFormFields";
import { ENDPOINTS } from "../../api";

export const InstructorCreation: React.FC = () => {
  return (
    <EntityCreationForm
      formTitle="Create - Instructor"
      postEndpoint={ENDPOINTS.INSTRUCTORS.CREATE}
      formFields={InstructorFormFields}
      backLink="/admin/instructors"
      successMessage="Instructor created"
    />
  );
};
