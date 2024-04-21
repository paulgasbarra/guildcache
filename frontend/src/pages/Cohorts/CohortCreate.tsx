import React, { useEffect } from "react";
import { EntityCreationForm } from "../../components/EntityCreationForm";
import { CohortFormFields } from "../../formFields/CohortFormFields";
import { ENDPOINTS } from "../../api";
import { useAuth } from "../../components/AuthContext";
import { InputObjectType } from "../../types/InputObjectType";

export const CohortCreation: React.FC = () => {
  const { organizationId } = useAuth();
  const [cohortFormFields, setCohortFormFields] =
    React.useState(CohortFormFields);

  useEffect(() => {
    const updatedFormFields: InputObjectType[] = [
      ...cohortFormFields,
      {
        id: "organization",
        placeholder: "",
        type: "association",
        label: "",
        error: [],
        value: organizationId,
      },
    ];
    setCohortFormFields(updatedFormFields);
  }, []);

  return (
    <EntityCreationForm
      formTitle="Create Cohort"
      postEndpoint={ENDPOINTS.COHORTS.CREATE}
      formFields={cohortFormFields}
      successMessage="Cohort created"
    />
  );
};
