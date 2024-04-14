import React from "react";

interface TextInputProps {
  id: string;
  label: string;
  placeholder?: string;
  error: string[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  placeholder,
  error,
  handleChange,
}) => (
  <div className="mb-3">
    <label htmlFor={id} className="block text-gray-700 font-medium">
      {label}:
    </label>
    <input
      id={id}
      name={id}
      type="text"
      placeholder={placeholder}
      className="mt-1 p-2 border rounded-md"
      onChange={handleChange}
    />
    {error.map((e, index) => (
      <div key={index} className="text-red-600">
        {e}
      </div>
    ))}
  </div>
);

export default TextInput;
