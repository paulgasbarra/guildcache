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
    if (
      cohorts.length > 0 &&
      instructorFormFields.find((f) => f.id === "cohorts") === undefined
    ) {
      const updatedFormFields: InputObjectType[] = [
        ...instructorFormFields,
        {
          id: "cohorts",
          placeholder: "",
          type: "checkbox-group",
          multiple: true,
          label: "Select Cohorts",
          error: [],
          value: [],
          options: cohorts.map((cohort: Cohort) => ({
            id: cohort.id,
            value: cohort.id.toString(),
            label: cohort.name,
            selected: false,
          })),
        },
      ];
      setinstructorFormFields(updatedFormFields);
    }
  }, [cohorts]);

  return (
    <EntityCreationForm
      formTitle="Create Instructor"
      postEndpoint={ENDPOINTS.INSTRUCTORS.CREATE}
      formFields={instructorFormFields}
      successMessage="Instructor created"
    />
  );
};
