import React from "react";
import { EntityCreationForm } from "../../components/EntityCreationForm";
import { EmployerFormFields } from "./EmployerFormFields";

export const EmployerCreation: React.FC = () => {
  return (
    <EntityCreationForm
      formTitle="Create - Employer"
      postEndpoint="/employers"
      formFields={EmployerFormFields}
      backLink="/admin/employers"
      successMessage="Employer created"
    />
  );
};
