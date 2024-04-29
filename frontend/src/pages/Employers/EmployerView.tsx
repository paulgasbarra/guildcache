import React from "react";
import { ENDPOINTS } from "../../api";
import { EmployerFormFields } from "../../formFields/EmployerFormFields";
import { EntityView } from "../../components/EntityView";

export const EmployerView = () => {
  return (
    <EntityView
      entityFormFields={EmployerFormFields}
      fetchDetailEndpoint={ENDPOINTS.EMPLOYERS.DETAILS}
      updateDetailEndpoint={ENDPOINTS.EMPLOYERS.DETAILS}
      backLink="/admin/employers"
      successMessage="Employer updated"
      modelType="employer"
    />
  );
};
