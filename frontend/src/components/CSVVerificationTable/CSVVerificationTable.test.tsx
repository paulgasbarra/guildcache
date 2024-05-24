import React from "react";
import CSVVerificationTable from "./CSVVerificationTable";
import { render, screen } from "@testing-library/react";

const mockFile = new File(
  ["id,name\n1,John Doe\n2,Jane Doe\n3,John Smith\n4,Jane Smith\n"],
  "mock_csv.csv",
  { type: "text/csv" }
);

const mockRequiredFormFields = [
  {
    id: "id",
    placeholder: "id",
    type: "text",
    label: "ID",
    error: [],
    value: "",
  },
  {
    id: "name",
    placeholder: "name",
    type: "text",
    label: "Name",
    error: [],
    value: "",
  },
];

describe("CSVVerificationTable Component", () => {
  it("renders a table element", () => {
    render(
      <CSVVerificationTable
        file={mockFile}
        requiredFields={mockRequiredFormFields.map((field) => ({
          ...field,
          error: [],
        }))}
      />
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
  });
  it("renders a table column for each field in the data", () => {
    render(
      <CSVVerificationTable
        file={mockFile}
        requiredFields={mockRequiredFormFields.map((field) => ({
          ...field,
          error: [],
        }))}
      />
    );
    expect(screen.getAllByRole("columnheader")).toHaveLength(2);
  });
  it("renders a table row for each record in the data", () => {
    render(
      <CSVVerificationTable
        file={mockFile}
        requiredFields={mockRequiredFormFields.map((field) => ({
          ...field,
          error: [],
        }))}
      />
    );
    expect(screen.getAllByRole("row")).toHaveLength(5);
  });
});
