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

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = text.split("\n");
      const data = rows.map((row) => row.split(","));
      setFileData(data);
    };
    reader.readAsText(file);
  }, [file]);

  return (
    <div>
      <h3>These are the records that will be uploaded:</h3>
      <table>
        <thead>
          <tr>
            {fileData.length > 0 &&
              fileData[0].map((field) => <th key={field.id}>{field.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {fileData.slice(0, fileData.length - 1).map((row, index) => (
            <tr key={index}>
              {row.map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CSVVerificationTable;
