import React from "react";
import { EntityCreationForm } from "../../components/EntityCreationForm";
import { CohortFormFields } from "./CohortFormFields";
import { ENDPOINTS } from "../../api";

export const CohortCreation: React.FC = () => {
  return (
    <EntityCreationForm
      formTitle="Create - Cohort"
      postEndpoint={ENDPOINTS.COHORTS.CREATE}
      formFields={CohortFormFields}
      backLink="/admin/cohorts"
      successMessage="Cohort created"
    />
  );
};
