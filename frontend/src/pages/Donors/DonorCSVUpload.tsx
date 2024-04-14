import React from "react";
import CSVUpload from "../../components/CSVUpload";
import { ENDPOINTS } from "../../api";

export function DonorCSVUpload() {
  return <CSVUpload endpoint={ENDPOINTS.DONORS.UPLOAD} modelName={"Donor"} />;
}
