import React, { useEffect, useState } from "react";
import { InputObjectType } from "../../types/InputObjectType";

interface CSVVerificationTableProps {
  file: File;
  requiredFields: InputObjectType[];
}

const CSVVerificationTable: React.FC<CSVVerificationTableProps> = ({
  file,
  requiredFields,
}) => {
  const [validData, setValidData] = useState<string[][]>([]);
  const [invalidData, setInvalidData] = useState<string[][]>([]);
  const [missingColumns, setMissingColumns] = useState<string[]>([]);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = text.split("\n");
      const data = rows.map((row) => row.split(","));
      const missingColumns = getMissingColumns(data);
      setMissingColumns(missingColumns);
      const sortedData = groupDataByValidity(data);
      setValidData(sortedData[0]);
      setInvalidData(sortedData[1]);
    };
    reader.readAsText(file);
  }, [file]);

  const getMissingColumns = (data: string[][]) => {
    const headerFields = data[0];
    return requiredFields
      .map((field) => (!headerFields.includes(field.id) ? field.id : null))
      .filter((field) => field !== null) as string[];
  };

  const groupDataByValidity = (data: string[][]) => {
    const validRows: string[][] = [];
    const invalidRows: string[][] = [];
    let headers = data[0];

    data = data.slice(1, data.length - 1);
    data.forEach((row) => {
      row.forEach((field, index) => {
        const requiredField = requiredFields.find(
          (requiredField) => requiredField.id === headers[index]
        );
        // check if data unique
        if (field === "") {
          field = "ERROR: Empty field";
          invalidRows.push(row);
        } else if (requiredField?.type == "number" && isNaN(Number(field))) {
          field = "ERROR: Not a number";
          invalidRows.push(row);
        }
      });
    });
    return [validRows, invalidRows];
  };

  if (missingColumns.length > 0) {
    return (
      <div>
        <h3>CSV is invalid:</h3>
        {missingColumns.map((column) => (
          <div>Missing column: {column}</div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h3>These are the records that will be uploaded:</h3>
      <table>
        <thead>
          <tr>
            {validData.length > 0 &&
              validData[0].map((field) => <th key={field}>{field}</th>)}
          </tr>
        </thead>
        <tbody>
          {validData.slice(1, validData.length - 1).map((row, index) => (
            <tr key={index}>
              {row.map((item, index) => (
                <td key={index}>{item}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CSVVerificationTable;
