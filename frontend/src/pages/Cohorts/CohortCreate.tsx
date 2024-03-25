import React from "react";
import { EntityCreationForm } from "../../components/EntityCreationForm";
import { CohortFormFields } from "./CohortFormFields";

export const CohortCreation: React.FC = () => {
  return (
    <EntityCreationForm
      formTitle="Create - Cohort"
      postEndpoint="/cohorts"
      formFields={CohortFormFields}
      backLink="/admin/cohorts"
      successMessage="Cohort created"
    />
  );
};
