import React from "react";
import CheckboxGroupInput from "./CheckboxGroupInput";

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
  options: {
    id: string | number;
    label: string;
    selected: boolean;
    value: string;
  }[];
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
  if (type === "checkbox-group" && options) {
    return (
      <CheckboxGroupInput
        id={name}
        label={labelName}
        error={[]}
        handleChange={onChange}
        value={value}
        options={options.map((option) => ({
          value: option.value,
          label: option.label,
          selected: option.selected,
        }))}
      />
    );
  }
  if (type === "select") {
    return (
      <div>
        <label htmlFor={name} className="block text-gray-700 font-medium">
          {labelName}
        </label>
        <select
          key={name}
          id={value}
          name={name}
          className="mt-1 p-2 border rounded-md w-full focus:ring-gray-500 focus:border-gray-500 accent-gray-500"
          onChange={onChange}
        >
          <option key={"select"} value="">
            Select {labelName}
          </option>
          {options &&
            options.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label || option.id}
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
        className="mt-1 border p-2 rounded-md focus:ring-gray-500 focus:border-gray-500 checked:bg-gray-500"
        id={name}
        name={name}
        onChange={onChange}
        type={type ? type : "text"}
        value={value}
      />
    </div>
  );
};
