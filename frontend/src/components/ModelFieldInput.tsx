import React from "react";

interface ModelFieldInputProps {
  name: string;
  labelName: string;
  value: any;
  type?: string | undefined;
  onChange: (e: any) => void;
  options?: { id: string | number; name: string }[];
}

export const ModelFieldInput: React.FC<ModelFieldInputProps> = ({
  name,
  labelName,
  value,
  type,
  onChange,
  options,
}) => {
  if (type === "association" || type === "members") return null;
  if (type === "select") {
    return (
      <div>
        <label htmlFor={name} className="block text-gray-700 font-medium">
          {name}
        </label>
        <select
          id={value}
          name={name}
          className="mt-1 p-2 border rounded-md w-full"
          onChange={onChange}
        >
          <option value="">Select {name}</option>
          {options &&
            options.map((option) => (
              <option key={option.name} value={option.id}>
                {option.name}
              </option>
            ))}
        </select>
      </div>
    );
  }
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
