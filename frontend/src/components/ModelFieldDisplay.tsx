import React from "react";
type ModelFieldDisplayProps = {
  name: string;
  value: any;
};

export const ModelFieldDisplay: React.FC<ModelFieldDisplayProps> = ({
  name,
  value,
}) => {
  if (Array.isArray(value)) {
    return (
      <div>
        <label className="text-blue-700 font-medium mr-2">{name}:</label>
        <ul>
          {value.map((v: any, i: number) => (
            <li key={i}>{v.name}</li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className="flex items-center">
      <label className="text-blue-700 font-medium mr-2">{name}:</label>
      <span>{value}</span>
    </div>
  );
};
