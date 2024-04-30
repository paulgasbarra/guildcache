import React from "react";
import CSVUpload from "../../components/CSVUpload";
import { ENDPOINTS } from "../../api";
import { InstructorFormFields } from "../../formFields/InstructorFormFields";

export function InstructorCSVUpload() {
  return (
    <CSVUpload
      endpoint={ENDPOINTS.INSTRUCTORS.UPLOAD}
      formFields={InstructorFormFields}
      modelName={"Instructor"}
    />
  );
}
