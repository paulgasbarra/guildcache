import React from "react";
import CSVUpload from "../../components/CSVUpload";
import { ENDPOINTS } from "../../api";
import { EmployerFormFields } from "../../formFields/EmployerFormFields";

export function EmployerCSVUpload() {
  return (
    <CSVUpload
      endpoint={ENDPOINTS.EMPLOYERS.UPLOAD}
      formFields={EmployerFormFields}
      modelName={"Employer"}
    />
  );
}
