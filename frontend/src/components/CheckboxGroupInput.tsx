import React, { useEffect, useState } from "react";

interface CheckboxGroupInputProps {
  id: string;
  label: string;
  error: string[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: number[];
  options: { value: string; label: string; selected: boolean }[];
}

const CheckboxGroupInput: React.FC<CheckboxGroupInputProps> = ({
  id,
  label,
  error,
  handleChange,
  options,
  value = [],
}) => {
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    const selectedValues = options
      .filter((option) => option.selected)
      .map((option) => parseInt(option.value));
    setSelected(selectedValues);
  }, []);

  useEffect(() => {
    const target = {
      name: id,
      value: selected,
    } as unknown as HTMLInputElement;

    const syntheticEvent = {
      target,
      currentTarget: target,
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    handleChange(syntheticEvent);
  }, [selected]);

  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setSelected((selected) =>
      selected.includes(value)
        ? selected.filter((option) => option !== value)
        : [...selected, value]
    );
  };

  return (
    <div className="mb-4">
      <label id={id} className="block text-gray-700 font-medium">
        {label}
      </label>
      {options.map((option) => (
        <div className="p-2" key={option.value}>
          <label>
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              value={option.value}
              checked={
                option.selected || value.includes(parseInt(option.value))
              }
              onChange={onCheckboxChange}
            />
            {option.label}
          </label>
        </div>
      ))}
      {error.map((e, index) => (
        <div key={index} className="text-red-600">
          {e}
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroupInput;
