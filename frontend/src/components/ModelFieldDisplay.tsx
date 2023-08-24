import React from "react";
type ModelFieldDisplayProps = {
  name: string;
  value: any;
};

export const ModelFieldDisplay: React.FC<ModelFieldDisplayProps> = ({
  name,
  value,
}) => {
  return (
    <div className="flex items-center">
      <label className="text-blue-700 font-medium mr-2">{name}:</label>
      <span>{value}</span>
    </div>
  );
};
