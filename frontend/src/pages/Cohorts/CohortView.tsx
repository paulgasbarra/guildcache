import React from "react";
import { ENDPOINTS } from "../../api";
import { CohortFormFields } from "./CohortFormFields";
import { EntityView } from "../../components/EntityView";

export const CohortView = () => {
  return (
    <EntityView
      entityFormFields={CohortFormFields}
      fetchDetailEndpoint={ENDPOINTS.COHORTS.DETAILS}
      updateDetailEndpoint={ENDPOINTS.COHORTS.DETAILS}
      backLink="/admin/Cohorts"
      successMessage="Cohort updated"
    />
  );
};
