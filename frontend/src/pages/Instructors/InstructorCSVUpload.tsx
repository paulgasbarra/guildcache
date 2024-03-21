import React from "react";
import CSVUpload from "../../components/CSVUpload";
import { ENDPOINTS } from "../../api";

export function InstructorCSVUpload() {
  return <CSVUpload endpoint={ENDPOINTS.INSTRUCTORS.UPLOAD} />;
}
