import React, { useEffect, useState } from "react";
import { EntityCreationForm } from "../../components/EntityCreationForm";
import { InstructorFormFields as initialInstructorFormFields } from "../../formFields/InstructorFormFields";
import { axiosInstance, ENDPOINTS } from "../../api";
import { InputObjectType } from "../../types/InputObjectType";
import { Cohort } from "../../types/Cohort";

export const InstructorCreation: React.FC = () => {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [instructorFormFields, setinstructorFormFields] = useState<
    InputObjectType[]
  >(initialInstructorFormFields);

  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const response = await axiosInstance.get(ENDPOINTS.COHORTS.LIST);
        setCohorts(response.data);
      } catch (error) {
        console.error("Error fetching cohorts:", error);
      }
    };
    fetchCohorts();
  }, []);

  useEffect(() => {
    if (cohorts.length > 0) {
      const updatedFormFields: InputObjectType[] = [
        ...instructorFormFields,
        {
          id: "cohorts",
          placeholder: "Select Cohort",
          type: "select",
          multiple: true,
          label: "Cohort",
          error: [],
          value: "",
          options: cohorts.map((cohort: Cohort) => ({
            value: cohort.id,
            label: cohort.name,
          })),
        },
      ];
      setinstructorFormFields(updatedFormFields);
    }
  }, [cohorts]);

  return (
    <EntityCreationForm
      formTitle="Create - Instructor"
      postEndpoint={ENDPOINTS.INSTRUCTORS.CREATE}
      formFields={instructorFormFields}
      backLink="/admin/instructors"
      successMessage="Instructor created"
    />
  );
};
