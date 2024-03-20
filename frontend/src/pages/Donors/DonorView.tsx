import React from "react";
import { ENDPOINTS } from "../../api";
import { DonorFormFields } from "./DonorFormFields";
import { EntityView } from "../../components/EntityView";

export const DonorView = () => {
  return (
    <EntityView
      entityFormFields={DonorFormFields}
      fetchDetailEndpoint={ENDPOINTS.DONORS.DETAILS}
      updateDetailEndpoint={ENDPOINTS.DONORS.DETAILS}
      backLink="/admin/donors"
      successMessage="Donor updated"
    />
  );
};
