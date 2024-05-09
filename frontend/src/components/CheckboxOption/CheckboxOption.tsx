import React from "react";

interface CheckboxOptionProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  option: { value: string; label: string; selected: boolean };
}

const CheckboxOption: React.FC<CheckboxOptionProps> = ({
  checked,
  onChange,
  option,
}) => {
  return (
    <div className="p-2">
      <label>
        <input
          className="mr-2 leading-tight"
          type="checkbox"
          value={option.value}
          checked={checked}
          onChange={onChange}
        />
        {option.label}
      </label>
    </div>
  );
};

export default CheckboxOption;
