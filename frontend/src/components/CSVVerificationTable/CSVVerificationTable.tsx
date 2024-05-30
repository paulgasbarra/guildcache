import React, { useEffect, useState } from "react";
import { InputObjectType } from "../../types/InputObjectType";
import Papa from "papaparse";

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
      const data = Papa.parse(e.target?.result as string).data;
      const missingColumns = getMissingColumns(data);
      if (missingColumns.length > 0) {
        setMissingColumns(missingColumns);
      } else {
        const sortedData = groupDataByValidity(data);
        setValidData(sortedData[0]);
        setInvalidData(sortedData[1]);
      }
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

    const headers = data[0];

    data = data.slice(1, data.length - 1);
    data.forEach((row) => {
      if (rowIsValid(row, headers)) {
        validRows.push(row);
      } else {
        invalidRows.push(row);
      }
    });
    return [validRows, invalidRows];
  };

  const rowIsValid = (row: string[], headers: string[]) => {
    if (row.length !== headers.length) {
      return false;
    }
    return true;
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
      {validData.length > 0 && (
        <>
          <h3>These are the records that will be uploaded:</h3>
          <table>
            <thead>
              <tr>
                <th></th>
                {requiredFields.map((field) => (
                  <th key={field.id}>{field.id}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {validData.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {row.map((item, index) => (
                    <td key={index}>{item}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {invalidData.length > 0 && (
        <>
          <h3>These records are invalid:</h3>
          <table>
            <thead>
              <th></th>
              <tr>
                <th></th>
                {requiredFields.map((field) => (
                  <th key={field.id}>{field.id}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invalidData.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {row.map((item, index) => (
                    <td key={index}>{item}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CSVVerificationTable;
