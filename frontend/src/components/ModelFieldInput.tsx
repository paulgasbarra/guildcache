import React from "react";
import CheckboxGroupInput from "./CheckboxGroupInput/CheckboxGroupInput";

interface ModelFieldInputProps {
  name: string;
  labelName: string;
  value: any;
  type?: string | undefined;
  onChange: (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  options?: {
    id: string | number;
    label: string;
    selected: boolean;
    value: string;
  }[];
  errorMessage?: string | string[] | undefined;
}

export const ModelFieldInput: React.FC<ModelFieldInputProps> = ({
  name,
  labelName,
  value,
  type,
  onChange,
  options,
  errorMessage,
}) => {
  if (type === "association" || type === "members") return null;
  if (type === "checkbox-group" && options) {
    return (
      <>
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
        <div className="text-red-500 capitalize">{errorMessage}</div>
      </>
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
        {errorMessage && errorMessage.length > 0 && (
          <div className="text-red-500 capitalize">{errorMessage}</div>
        )}
      </div>
    );
  }
  if (type === "textarea") {
    return (
      <div className="mb-3">
        <label htmlFor={name} className="block text-grey-700 font-medium">
          {labelName}
        </label>
        <textarea
          className="mt-1 border p-2 rounded-md focus:ring-gray-500 focus:border-gray-500"
          id={name}
          name={name}
          onChange={onChange}
          value={value}
        />
        {errorMessage && errorMessage.length > 0 && (
          <div className="text-red-500 capitalize">{errorMessage}</div>
        )}
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
      {errorMessage && errorMessage.length > 0 && (
        <div className="text-red-500 capitalize">{errorMessage}</div>
      )}
    </div>
  );
};
