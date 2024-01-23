import React from "react";
import { Link } from "react-router-dom";

interface TableProps {
  modelList: any[];
  handleDelete: (id: string) => void;
  headers: string[];
}

const ModelTable: React.FC<TableProps> = ({
  modelList,
  headers,
  handleDelete,
}) => {
  return (
    <table className="divide-y divide-gray-200 shadow-md bg-white rounded-lg">
      <thead className="bg-gray-800">
        <tr key="table-header">
          {headers.map((header) => (
            <th
              key={header}
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-300">
        {modelList.map((instance) => (
          <tr key={instance.id} className="hover:bg-gray-100">
            <td className="px-6 py-4 whitespace-nowrap">
              <Link to={`${instance.id}`} className="block hover:underline">
                {instance.name}
              </Link>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <Link to={`${instance.id}`} className="block hover:underline">
                {instance.email}
              </Link>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button
                onClick={() => handleDelete(instance.id)}
                className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out px-2 py-1 rounded border border-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ModelTable;
