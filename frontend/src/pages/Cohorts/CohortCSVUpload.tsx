import React from "react";
import CSVUpload from "../../components/CSVUpload";
import { ENDPOINTS } from "../../api";

export function CohortCSVUpload() {
  return <CSVUpload endpoint={ENDPOINTS.COHORTS.UPLOAD} modelName={"Cohort"} />;
}
