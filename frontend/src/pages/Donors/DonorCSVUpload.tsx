import React from "react";
import CSVUpload from "../../components/CSVUpload";
import { ENDPOINTS } from "../../api";
import { DonorFormFields } from "../../formFields/DonorFormFields";

export function DonorCSVUpload() {
  return (
    <CSVUpload
      endpoint={ENDPOINTS.DONORS.UPLOAD}
      formFields={DonorFormFields}
      modelName={"Donor"}
    />
  );
}
