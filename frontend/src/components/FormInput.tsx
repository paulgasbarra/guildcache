import React from "react";

interface FormInputProps {
  id: string;
  label: string;
  placeholder: string | undefined;
  type: string;
  error: string[];
  handleChange: any;
  options?: { value: string; label: string }[];
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  placeholder,
  type,
  error,
  handleChange,
  options,
}) => {
  if (type !== "select") {
    return (
      <div>
        <label htmlFor={id} className="block text-gray-700 font-medium">
          {label}
        </label>
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          className="mt-1 p-2 border rounded-md"
          onChange={handleChange}
        />
        {error.map((e: string, index: number) => (
          <div key={index} className="text-red-600">
            {e}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={id} className="block text-gray-700 font-medium">
        {label}
      </label>
      <select
        id={id}
        name={id}
        className="mt-1 p-2 border rounded-md w-full"
        onChange={handleChange}
      >
        <option value="">Select {label}</option>
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      {error.map((e: string, index: number) => (
        <div key={index} className="text-red-600">
          {e}
        </div>
      ))}
    </div>
  );
};
