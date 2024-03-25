import React from "react";
import { ENDPOINTS } from "../../api";
import { StudentFormFields } from "./StudentFormFields";
import { EntityCreationForm } from "../../components/EntityCreationForm";

export function StudentCreation() {
  return (
    <EntityCreationForm
      formTitle="Create - Student"
      postEndpoint={ENDPOINTS.STUDENTS.LIST}
      formFields={StudentFormFields}
      backLink="/admin/students"
      successMessage="Student created"
    />
  );
}
