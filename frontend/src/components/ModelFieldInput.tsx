import React from "react";

interface ModelFieldInputProps {
  name: string;
  labelName: string;
  value: any;
  type?: string | undefined;
  onChange: (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
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
          key={name}
          id={value}
          name={name}
          className="mt-1 p-2 border rounded-md w-full"
          onChange={onChange}
        >
          <option value="">Select {name}</option>
          {options &&
            options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
        </select>
      </div>
    );
  }
  return (
    <div className={`mb-3 ${type === "checkbox" ? "flex gap-2 " : ""}`}>
      <label htmlFor={name} className={`block text-grey-700 font-medium`}>
        {labelName}
      </label>
      <input
        checked={type === "checkbox" ? value === true : undefined}
        className="mt-1 border p-2 rounded-md"
        id={name}
        name={name}
        onChange={onChange}
        type={type ? type : "text"}
        value={value}
      />
    </div>
  );
};
