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
  const [fileData, setFileData] = useState<string[][]>([]);
  const [missingColumns, setMissingColumns] = useState<string[]>([]);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = text.split("\n");
      const data = rows.map((row) => row.split(","));
      if (isDataValid(data)) {
        console.log("Data is valid");
      } else {
        console.log("Data is invalid");
      }

      setFileData(data);
    };
    reader.readAsText(file);
  }, [file]);

  const isDataValid = (data: string[][]) => {
    const header = data[0];
    const missingColumns = requiredFields
      .map((field) => field.id)
      .filter((field) => !header.includes(field));
    setMissingColumns(missingColumns);
    return missingColumns.length === 0;
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
            {fileData.length > 0 &&
              fileData[0].map((field) => <th key={field}>{field}</th>)}
          </tr>
        </thead>
        <tbody>
          {fileData.slice(1, fileData.length - 1).map((row, index) => (
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
