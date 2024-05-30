import React from "react";

interface IndexedTableProps {
  data: string[][];
  title: string;
  headers: { id: string }[];
}

const IndexedTable: React.FC<IndexedTableProps> = ({
  data,
  title,
  headers,
}) => {
  return (
    <>
      <h3 className="font-bold">{title}</h3>
      <table className="w-full table-fixed border-collapse border border-slate-400 mb-4 overflow-scroll">
        <thead>
          <tr>
            <th className="w-4 border border-slate-300"></th>
            {headers.map((field) => (
              <th className="border border-slate-300 truncate" key={field.id}>
                {field.id}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="w-4 border border-slate-300 text-center">
                {index + 1}
              </td>
              {row.map((item, index) => (
                <td
                  className="border border-slate-300 text-center truncate"
                  key={index}
                >
                  {item}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default IndexedTable;
