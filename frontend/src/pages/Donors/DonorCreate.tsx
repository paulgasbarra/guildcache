import React from "react";
import { EntityCreationForm } from "../../components/EntityCreationForm";
import { DonorFormFields } from "../../formFields/DonorFormFields";
import { ENDPOINTS } from "../../api";

export const DonorCreation: React.FC = () => {
  return (
    <EntityCreationForm
      formTitle="Create Donor"
      postEndpoint={ENDPOINTS.DONORS.CREATE}
      formFields={DonorFormFields}
      successMessage="Donor created"
    />
  );
};
