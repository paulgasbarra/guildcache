import React from "react";
import CSVUpload from "../../components/CSVUpload";
import { ENDPOINTS } from "../../api";

export function StudentCSVUpload() {
  return <CSVUpload endpoint={ENDPOINTS.STUDENTS.UPLOAD} />;
}
