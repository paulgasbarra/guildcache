import React from "react";

interface ModelFieldInputProps {
  name: string;
  labelName: string;
  value: any;
  type?: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ModelFieldInput: React.FC<ModelFieldInputProps> = ({
  name,
  labelName,
  value,
  type,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor={name} className="text-blue-700 font-medium">
        {labelName}:
      </label>
      <input
        checked={type === "checkbox" ? value === true : undefined}
        className="border p-1 rounded-md"
        id={name}
        name={name}
        onChange={onChange}
        type={type ? type : "text"}
        value={value}
      />
    </div>
  );
};
