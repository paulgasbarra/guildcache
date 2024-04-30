import React from "react";
import CSVUpload from "../../components/CSVUpload";
import { ENDPOINTS } from "../../api";
import { StudentFormFields } from "../../formFields/StudentFormFields";

export function StudentCSVUpload() {
  return (
    <CSVUpload
      endpoint={ENDPOINTS.STUDENTS.UPLOAD}
      formFields={StudentFormFields}
      modelName={"Student"}
    />
  );
}
