import React, { useState, useEffect } from "react";
import { axiosInstance, ENDPOINTS } from "../../api";
import { StudentFormFields as initialStudentFormFields } from "../../formFields/StudentFormFields";
import { InputObjectType } from "../../types/InputObjectType";
import { EntityCreationForm } from "../../components/EntityCreationForm";

export function StudentCreation() {
  const [cohorts, setCohorts] = useState([] as any);
  const [studentFormFields, setStudentFormFields] = useState<InputObjectType[]>(
    initialStudentFormFields
  );

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
        ...studentFormFields,
        {
          id: "cohort",
          placeholder: "Select Cohort",
          type: "select",
          label: "Cohort",
          error: [],
          value: "",
          options: cohorts.map((cohort: any) => ({
            value: cohort.id,
            label: cohort.name,
          })),
        },
      ];
      setStudentFormFields(updatedFormFields);
    }
  }, [cohorts]);

  return (
    studentFormFields && (
      <EntityCreationForm
        formTitle="Create Student"
        postEndpoint={ENDPOINTS.STUDENTS.CREATE}
        formFields={studentFormFields}
        successMessage="Student created successfully"
      />
    )
  );
}
