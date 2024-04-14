import React from "react";
type ModelFieldDisplayProps = {
  name: string;
  value: string | number | boolean | any[] | undefined;
};

export const ModelFieldDisplay: React.FC<ModelFieldDisplayProps> = ({
  name,
  value,
}) => {
  if (Array.isArray(value)) {
    return (
      <div>
        <label className="text-gray-700 font-medium mr-2">{name}:</label>
        <ul>
          {value.length === 0 && <li>No {name}</li>}
          {value.map((v: any, i: number) => (
            <li key={i}>{v.name}</li>
          ))}
        </ul>
      </div>
    );
  }
  if (typeof value === "boolean") {
    return (
      <div className="flex items-center">
        <label className="block text-gray-700 font-medium mr-2">{name}:</label>
        <span className="font-bold">{value ? "Yes" : "No"}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center">
      <label className="block text-gray-700 font-medium mr-2">{name}:</label>
      <span className="font-bold">{value}</span>
    </div>
  );
};
