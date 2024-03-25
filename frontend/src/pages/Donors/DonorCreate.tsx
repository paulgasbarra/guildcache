import React from "react";
import { EntityCreationForm } from "../../components/EntityCreationForm";
import { DonorFormFields } from "./DonorFormFields";

export const DonorCreation: React.FC = () => {
  return (
    <EntityCreationForm
      formTitle="Create - Donor"
      postEndpoint="/donors"
      formFields={DonorFormFields}
      backLink="/admin/donors"
      successMessage="Donor created"
    />
  );
};
