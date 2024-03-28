import React from "react";

interface SelectInputProps {
  id: string;
  label: string;
  error: string[];
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  error,
  handleChange,
  options,
}) => (
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
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error.map((e, index) => (
      <div key={index} className="text-red-600">
        {e}
      </div>
    ))}
  </div>
);

export default SelectInput;
