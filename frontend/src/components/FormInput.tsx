import React from "react";

interface FormInputProps {
  id: string;
  label: string;
  placeholder: string | undefined;
  type: string;
  error: string[];
  handleChange: any;
  value?: any;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  placeholder,
  type,
  error,
  handleChange,
}) => {
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
      <div className="text-red-600">
        {error.map((e: string) => (
          <div>{e}</div>
        ))}
      </div>
    </div>
  );
};
