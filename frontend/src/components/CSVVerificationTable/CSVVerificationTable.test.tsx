import React from "react";
import CSVVerificationTable from "./CSVVerificationTable";
import { render, screen, waitFor } from "@testing-library/react";

const mockFileString =
  "id,name,email\n1,John Doe,jon@mail.com\n2,Jane Doe,jane@mail.com\n3,John Smith\n4,Jane Smith,smith@mail.com\n";

const returnMockFile = (csvString: string) => {
  return new File([csvString], "mock_csv.csv", { type: "text/csv" });
};

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
  {
    id: "email",
    placeholder: "email",
    type: "text",
    label: "Email",
    error: [],
    value: "",
  },
];

describe("CSVVerificationTable Component", () => {
  it("renders a table element", () => {
    render(
      <CSVVerificationTable
        file={returnMockFile(mockFileString)}
        requiredFields={mockRequiredFormFields.map((field) => ({
          ...field,
          error: [],
        }))}
      />
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
  });
  it("renders a table column for each field in the data", async () => {
    render(
      <CSVVerificationTable
        file={returnMockFile(mockFileString)}
        requiredFields={mockRequiredFormFields.map((field) => ({
          ...field,
          error: [],
        }))}
      />
    );
    await waitFor(() =>
      expect(screen.getAllByRole("columnheader")).toHaveLength(3)
    );
  });
  it("renders a table row for each record in the data", async () => {
    render(
      <CSVVerificationTable
        file={returnMockFile(mockFileString)}
        requiredFields={mockRequiredFormFields.map((field) => ({
          ...field,
          error: [],
        }))}
      />
    );
    await waitFor(() => expect(screen.getAllByRole("row")).toHaveLength(5));
  });
  it("lets the user know if there is a missing column", async () => {
    const invalidData = "id,name\n1,John Doe";
    const missingColumn = "email";
    render(
      <CSVVerificationTable
        file={returnMockFile(invalidData)}
        requiredFields={mockRequiredFormFields.map((field) => ({
          ...field,
          error: [],
        }))}
      />
    );
    await waitFor(() =>
      expect(screen.getByText("CSV is invalid:")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        screen.getByText(`Missing column: ${missingColumn}`)
      ).toBeInTheDocument()
    );
  });
});
