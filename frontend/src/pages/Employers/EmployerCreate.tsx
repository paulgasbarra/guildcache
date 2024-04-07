import React from "react";
import { EntityCreationForm } from "../../components/EntityCreationForm";
import { EmployerFormFields } from "../../formFields/EmployerFormFields";
import { ENDPOINTS } from "../../api";

export const EmployerCreation: React.FC = () => {
  return (
    <EntityCreationForm
      formTitle="Create - Employer"
      postEndpoint={ENDPOINTS.EMPLOYERS.CREATE}
      formFields={EmployerFormFields}
      backLink="/admin/employers"
      successMessage="Employer created"
    />
  );
};
