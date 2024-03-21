import React from "react";
import CSVUpload from "../../components/CSVUpload";
import { ENDPOINTS } from "../../api";

export function EmployerCSVUpload() {
  return <CSVUpload endpoint={ENDPOINTS.EMPLOYERS.UPLOAD} />;
}
