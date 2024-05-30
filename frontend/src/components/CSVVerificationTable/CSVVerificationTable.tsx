import React, { useEffect, useState } from "react";
import { InputObjectType } from "../../types/InputObjectType";
import IndexedTable from "../IndexedTable";
import Papa from "papaparse";
import { validateImportRows } from "../../utils/validateImportRows";

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
      const data = Papa.parse(e.target?.result as string).data as string[][];
      const missingColumns = getMissingColumns(data);
      if (missingColumns.length > 0) {
        setMissingColumns(missingColumns);
      } else {
        const sortedData = validateImportRows(data, requiredFields);
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
        <IndexedTable
          data={validData}
          title="These are the records that will be uploaded:"
          headers={requiredFields}
        />
      )}
      {invalidData.length > 0 && (
        <IndexedTable
          data={invalidData}
          title="These records are invalid"
          headers={requiredFields}
        />
      )}
    </div>
  );
};

export default CSVVerificationTable;
